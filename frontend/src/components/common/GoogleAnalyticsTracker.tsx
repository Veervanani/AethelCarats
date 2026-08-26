import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../../services/api';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    floksyTrackEcommerce?: (eventName: string, params?: Record<string, any>) => void;
    floksyTrackingConfig?: {
      tagIds: string[];
      merchantCenterIds: string[];
      gtmId?: string;
      fbPixelId?: string;
    };
  }
}

export const GoogleAnalyticsTracker: React.FC = () => {
  const location = useLocation();
  const initializedRef = useRef(false);
  const activeTagsRef = useRef<string[]>([]);

  useEffect(() => {
    let isMounted = true;

    const initTracking = async () => {
      try {
        const settings = await api.getSiteSettings().catch(() => ({}));

        if (!isMounted) return;

        const isGaEnabled = settings.enable_google_analytics !== false && settings.enable_google_analytics !== 'false';
        const isGoogleTagEnabled = settings.enable_google_tag !== false && settings.enable_google_tag !== 'false';

        if (!isGaEnabled && !isGoogleTagEnabled) {
          console.log('[Analytics] Google Tag & Analytics disabled in settings.');
          return;
        }

        // Collect all Google Tag IDs
        const tagSet = new Set<string>();

        if (settings.google_analytics_id) {
          const mainId = String(settings.google_analytics_id).trim();
          if (mainId) tagSet.add(mainId);
        }

        if (settings.google_tag_ids) {
          const rawTags = String(settings.google_tag_ids);
          rawTags
            .split(/[\n,;]+/)
            .map((t) => t.trim())
            .filter((t) => t.length > 3)
            .forEach((t) => tagSet.add(t));
        }

        // Fallbacks from verified stream if nothing configured in DB
        if (tagSet.size === 0) {
          ['G-4819ZT1SH9', 'G-XXY9NETZMZ', 'GT-NFXXGC34', 'GT-WPL2TXJW', 'GT-NSVC87ZS'].forEach((id) => tagSet.add(id));
        }

        const tagIds = Array.from(tagSet);
        activeTagsRef.current = tagIds;

        // Collect Merchant Center IDs
        const mcIds = String(settings.google_merchant_center_id || 'MC-FZJ1P4XPW8, MC-V2Y54WKJL7')
          .split(/[\n,;]+/)
          .map((id) => id.trim())
          .filter(Boolean);

        window.floksyTrackingConfig = {
          tagIds,
          merchantCenterIds: mcIds,
          gtmId: settings.google_tag_manager_id || 'GT-NFXXGC34',
          fbPixelId: settings.facebook_pixel_id || '',
        };

        const primaryTagId = tagIds[0] || 'G-4819ZT1SH9';

        // 1. Initialize dataLayer & gtag
        window.dataLayer = window.dataLayer || [];
        if (!window.gtag) {
          window.gtag = function () {
            window.dataLayer?.push(arguments);
          };
        }

        window.gtag('js', new Date());

        // Configure each Google Tag destination
        tagIds.forEach((id) => {
          window.gtag?.('config', id, {
            send_page_view: false, // Page views handled on router change
            cookie_domain: 'auto',
            cookie_flags: 'SameSite=None;Secure',
          });
        });

        // Configure Merchant Center Destinations if provided
        mcIds.forEach((mcId) => {
          window.gtag?.('config', mcId);
        });

        // 2. Inject official gtag.js script if not present
        const existingScript = document.getElementById('floksy-gtag-script');
        if (!existingScript) {
          const script = document.createElement('script');
          script.id = 'floksy-gtag-script';
          script.async = true;
          script.src = `https://www.googletagmanager.com/gtag/js?id=${primaryTagId}`;
          document.head.appendChild(script);
        }

        // 3. Inject Google Tag Manager (GTM) if configured
        const gtmId = settings.google_tag_manager_id || 'GT-NFXXGC34';
        if (gtmId && !document.getElementById('floksy-gtm-script')) {
          const gtmScript = document.createElement('script');
          gtmScript.id = 'floksy-gtm-script';
          gtmScript.innerHTML = `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `;
          document.head.appendChild(gtmScript);
        }

        // 4. Inject Facebook / Meta Pixel if configured
        if (settings.facebook_pixel_id && !document.getElementById('floksy-fb-pixel')) {
          const fbScript = document.createElement('script');
          fbScript.id = 'floksy-fb-pixel';
          fbScript.innerHTML = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${settings.facebook_pixel_id}');
            fbq('track', 'PageView');
          `;
          document.head.appendChild(fbScript);
        }

        // 5. Inject custom head scripts if configured
        if (settings.custom_head_scripts && !document.getElementById('floksy-custom-head-scripts')) {
          const headContainer = document.createElement('div');
          headContainer.id = 'floksy-custom-head-scripts';
          headContainer.style.display = 'none';
          headContainer.innerHTML = settings.custom_head_scripts;
          document.head.appendChild(headContainer);

          // Execute script tags inside custom_head_scripts
          const scripts = headContainer.getElementsByTagName('script');
          for (let i = 0; i < scripts.length; i++) {
            const oldScript = scripts[i];
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach((attr) => newScript.setAttribute(attr.name, attr.value));
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode?.replaceChild(newScript, oldScript);
          }
        }

        // 6. Global eCommerce Helper
        window.floksyTrackEcommerce = (eventName: string, params: Record<string, any> = {}) => {
          if (typeof window.gtag === 'function') {
            activeTagsRef.current.forEach((id) => {
              window.gtag?.('event', eventName, {
                send_to: id,
                ...params,
              });
            });
          }
        };

        initializedRef.current = true;

        // Send initial page view
        sendPageView(location.pathname + location.search);
      } catch (err) {
        console.error('[Analytics] Failed to initialize Google Tag tracking:', err);
      }
    };

    initTracking();

    return () => {
      isMounted = false;
    };
  }, []);

  // Send page view on route change
  useEffect(() => {
    if (initializedRef.current) {
      sendPageView(location.pathname + location.search);
    }
  }, [location.pathname, location.search]);

  const sendPageView = (urlPath: string) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      const activeTags = activeTagsRef.current.length > 0
        ? activeTagsRef.current
        : ['G-4819ZT1SH9', 'G-XXY9NETZMZ', 'GT-NFXXGC34'];

      activeTags.forEach((tagId) => {
        window.gtag?.('event', 'page_view', {
          send_to: tagId,
          page_title: document.title,
          page_location: window.location.href,
          page_path: urlPath,
        });
      });
    }
  };

  return null;
};
