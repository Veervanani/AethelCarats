import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Edit2,
  Copy,
  Check,
  Eye,
  EyeOff,
  FileText,
  Image as ImageIcon,
  HelpCircle,
  Shield,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  Layers,
  Settings,
} from 'lucide-react';
import { api } from '../../../services/api';

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectionBox = styled.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 24px;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem;
    color: #1f1f1f;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e8e3d9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const FormGrid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols || 2}, 1fr);
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ $full?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  ${({ $full }) => $full && 'grid-column: 1 / -1;'}

  label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #55514b;
    letter-spacing: 0.05em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  input,
  textarea,
  select {
    padding: 10px 14px;
    border: 1px solid #d9d3c7;
    border-radius: 4px;
    font-size: 0.85rem;
    background: #fffdf9;

    &:focus {
      outline: none;
      border-color: #c9a45c;
    }
  }
`;

const ItemTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
  font-size: 0.85rem;

  th {
    background: #1f1f1f;
    color: #fffdf9;
    padding: 10px 14px;
    text-align: left;
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  td {
    padding: 12px 14px;
    border-bottom: 1px solid #e8e3d9;
  }
`;

const AddBtn = styled.button`
  padding: 8px 16px;
  background: #c9a45c;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    opacity: 0.9;
  }
`;

const InfoBanner = styled.div`
  background: #f7f3e9;
  border-left: 4px solid #c9a45c;
  padding: 14px 18px;
  font-size: 0.85rem;
  color: #55514b;
  margin-bottom: 16px;
  border-radius: 0 4px 4px 0;
`;

const ToggleSwitch = styled.button<{ $active: boolean }>`
  padding: 4px 10px;
  border-radius: 12px;
  border: none;
  font-weight: 700;
  font-size: 0.7rem;
  cursor: pointer;
  background: ${({ $active }) => ($active ? '#e6f4ea' : '#f1f3f4')};
  color: ${({ $active }) => ($active ? '#137333' : '#5f6368')};
`;

interface EditorProps {
  content: any;
  onChange: (newContent: any) => void;
}

// 1. CONTACT US PAGE CONTENT EDITOR
const DEFAULT_ENQUIRY_TYPES = [
  { id: 'eq_1', name: 'General Consultation', isEnabled: true, sortOrder: 1 },
  { id: 'eq_2', name: 'Diamond Enquiry', isEnabled: true, sortOrder: 2 },
  { id: 'eq_3', name: 'Bespoke Custom CAD Design', isEnabled: true, sortOrder: 3 },
  { id: 'eq_4', name: 'Ring Sizing & Metal Guidance', isEnabled: true, sortOrder: 4 },
  { id: 'eq_5', name: 'Private Appointment', isEnabled: true, sortOrder: 5 },
  { id: 'eq_6', name: 'Virtual Video Consultation', isEnabled: true, sortOrder: 6 },
];

const DEFAULT_FORM_FIELDS = [
  { id: 'ff_1', label: 'FIRST NAME', placeholder: 'Enter your first name', type: 'text', required: true, isEnabled: true },
  { id: 'ff_2', label: 'LAST NAME', placeholder: 'Enter your last name', type: 'text', required: true, isEnabled: true },
  { id: 'ff_3', label: 'EMAIL ADDRESS', placeholder: 'name@example.com', type: 'email', required: true, isEnabled: true },
  { id: 'ff_4', label: 'PHONE NUMBER', placeholder: '+1 (555) 000-0000', type: 'phone', required: false, isEnabled: true },
  { id: 'ff_5', label: 'ENQUIRY TYPE', placeholder: 'Select enquiry category', type: 'dropdown', required: true, isEnabled: true },
  { id: 'ff_6', label: 'MESSAGE', placeholder: 'Please describe how we can assist you with your diamond or jewellery selection...', type: 'textarea', required: true, isEnabled: true },
];

const DEFAULT_BUTTONS = [
  { id: 'btn_1', text: 'SEND ENQUIRY', link: '#submit', style: 'primary', isVisible: true },
  { id: 'btn_2', text: 'WHATSAPP CONCIERGE', link: 'https://wa.me/91973785306', style: 'gold', isVisible: true },
  { id: 'btn_3', text: 'BOOK PRIVATE APPOINTMENT', link: '/appointments', style: 'secondary', isVisible: true },
];

export const ContactUsEditor: React.FC<EditorProps> = ({ content, onChange }) => {
  const updateField = (key: string, val: any) => {
    onChange({ ...content, [key]: val });
  };

  const enquiryTypes = (content.enquiryTypes && content.enquiryTypes.length > 0) ? content.enquiryTypes : DEFAULT_ENQUIRY_TYPES;
  const formFields = (content.formFields && content.formFields.length > 0) ? content.formFields : DEFAULT_FORM_FIELDS;
  const buttons = (content.buttons && content.buttons.length > 0) ? content.buttons : DEFAULT_BUTTONS;

  const handleAddField = () => {
    const newF = { id: `field_${Date.now()}`, label: 'New Field', placeholder: 'Enter value', type: 'text', required: false, isEnabled: true, sortOrder: formFields.length + 1 };
    updateField('formFields', [...formFields, newF]);
  };

  const handleAddEnquiryType = () => {
    const newT = { id: `type_${Date.now()}`, name: 'New Enquiry Category', isEnabled: true, sortOrder: enquiryTypes.length + 1 };
    updateField('enquiryTypes', [...enquiryTypes, newT]);
  };

  const handleAddButton = () => {
    const newB = { id: `btn_${Date.now()}`, text: 'NEW CTA BUTTON', link: '#', style: 'primary', isVisible: true };
    updateField('buttons', [...buttons, newB]);
  };

  return (
    <EditorContainer>
      {/* SECTION 1: HERO */}
      <SectionBox>
        <h3>Page Hero & Introduction</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Page Heading</label>
            <input type="text" value={content.heading ?? 'Contact Floksy Jewel'} onChange={(e) => updateField('heading', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Subtitle / Intro Description</label>
            <textarea rows={2} value={content.subheading ?? ''} onChange={(e) => updateField('subheading', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      {/* SECTION 2: CUSTOMER CARE */}
      <SectionBox>
        <h3>Customer Care Header</h3>
        <FormGrid>
          <FormGroup>
            <label>Customer Care Heading</label>
            <input type="text" value={content.customerCareHeading ?? 'CUSTOMER CARE'} onChange={(e) => updateField('customerCareHeading', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Customer Care Description</label>
            <textarea rows={2} value={content.customerCareDescription ?? ''} onChange={(e) => updateField('customerCareDescription', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      {/* SECTION 3: TELEPHONE ASSISTANCE */}
      <SectionBox>
        <h3>Telephone Assistance Block</h3>
        <FormGrid>
          <FormGroup>
            <label>Label</label>
            <input type="text" value={content.phoneLabel ?? 'TELEPHONE ASSISTANCE'} onChange={(e) => updateField('phoneLabel', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Phone Number</label>
            <input type="text" value={content.phone ?? '+91973785306'} onChange={(e) => updateField('phone', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Business Hours Note</label>
            <input type="text" value={content.businessHours ?? 'Mon – Sat: 9:00 AM – 7:00 PM GMT'} onChange={(e) => updateField('businessHours', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      {/* SECTION 4: EMAIL CONCIERGE */}
      <SectionBox>
        <h3>Email Concierge Block</h3>
        <FormGrid>
          <FormGroup>
            <label>Label</label>
            <input type="text" value={content.emailLabel ?? 'EMAIL CONCIERGE'} onChange={(e) => updateField('emailLabel', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Email Address</label>
            <input type="email" value={content.email ?? 'contact@floksyjewel.com'} onChange={(e) => updateField('email', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Response Time Guarantee</label>
            <input type="text" value={content.responseTime ?? 'Responses within 24 business hours'} onChange={(e) => updateField('responseTime', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      {/* SECTION 5: PRIVATE ATELIER APPOINTMENTS */}
      <SectionBox>
        <h3>Private Atelier Appointments Block</h3>
        <FormGrid>
          <FormGroup>
            <label>Location Label</label>
            <input type="text" value={content.locationLabel ?? 'PRIVATE ATELIER APPOINTMENTS'} onChange={(e) => updateField('locationLabel', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Address / Location</label>
            <input type="text" value={content.address ?? 'Surat, India'} onChange={(e) => updateField('address', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Appointment Description</label>
            <input type="text" value={content.appointmentDescription ?? 'By private appointment only'} onChange={(e) => updateField('appointmentDescription', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      {/* SECTION 6: ENQUIRY FORM LABELS */}
      <SectionBox>
        <h3>Enquiry Form Headers & Field Labels</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Form Heading</label>
            <input type="text" value={content.formHeading ?? 'Send an Enquiry'} onChange={(e) => updateField('formHeading', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>First Name Label</label>
            <input type="text" value={content.firstNameLabel ?? 'FIRST NAME'} onChange={(e) => updateField('firstNameLabel', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>First Name Placeholder</label>
            <input type="text" value={content.firstNamePlaceholder ?? 'Enter your first name'} onChange={(e) => updateField('firstNamePlaceholder', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Last Name Label</label>
            <input type="text" value={content.lastNameLabel ?? 'LAST NAME'} onChange={(e) => updateField('lastNameLabel', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Last Name Placeholder</label>
            <input type="text" value={content.lastNamePlaceholder ?? 'Enter your last name'} onChange={(e) => updateField('lastNamePlaceholder', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Email Address Label</label>
            <input type="text" value={content.emailInputLabel ?? 'EMAIL ADDRESS'} onChange={(e) => updateField('emailInputLabel', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Email Placeholder</label>
            <input type="text" value={content.emailInputPlaceholder ?? 'name@example.com'} onChange={(e) => updateField('emailInputPlaceholder', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Phone Number Label</label>
            <input type="text" value={content.phoneInputLabel ?? 'PHONE NUMBER'} onChange={(e) => updateField('phoneInputLabel', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Phone Placeholder</label>
            <input type="text" value={content.phoneInputPlaceholder ?? '+1 (555) 000-0000'} onChange={(e) => updateField('phoneInputPlaceholder', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Enquiry Type Dropdown Label</label>
            <input type="text" value={content.enquiryTypeLabel ?? 'ENQUIRY TYPE'} onChange={(e) => updateField('enquiryTypeLabel', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Message Label</label>
            <input type="text" value={content.messageLabel ?? 'MESSAGE'} onChange={(e) => updateField('messageLabel', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Message Placeholder</label>
            <textarea rows={2} value={content.messagePlaceholder ?? 'Please describe how we can assist you...'} onChange={(e) => updateField('messagePlaceholder', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      {/* SECTION 7: ENQUIRY TYPE DROPDOWN MANAGER */}
      <SectionBox>
        <h3>
          Enquiry Types Dropdown Manager
          <AddBtn onClick={handleAddEnquiryType}>
            <Plus size={14} /> + Add Dropdown Option
          </AddBtn>
        </h3>
        <ItemTable>
          <thead>
            <tr>
              <th>Option Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiryTypes.map((t: any, idx: number) => (
              <tr key={t.id || idx}>
                <td>
                  <input
                    type="text"
                    value={t.name}
                    onChange={(e) => {
                      const updated = [...enquiryTypes];
                      updated[idx] = { ...updated[idx], name: e.target.value };
                      updateField('enquiryTypes', updated);
                    }}
                  />
                </td>
                <td>
                  <ToggleSwitch
                    $active={t.isEnabled}
                    type="button"
                    onClick={() => {
                      const updated = [...enquiryTypes];
                      updated[idx] = { ...updated[idx], isEnabled: !updated[idx].isEnabled };
                      updateField('enquiryTypes', updated);
                    }}
                  >
                    {t.isEnabled ? 'Active' : 'Disabled'}
                  </ToggleSwitch>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = enquiryTypes.filter((_: any, i: number) => i !== idx);
                      updateField('enquiryTypes', updated);
                    }}
                    style={{ border: 'none', background: 'none', color: '#c00', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ItemTable>
      </SectionBox>

      {/* SECTION 8: FORM FIELDS MANAGER */}
      <SectionBox>
        <h3>
          Form Fields Manager
          <AddBtn onClick={handleAddField}>
            <Plus size={14} /> + Add Form Field
          </AddBtn>
        </h3>
        <ItemTable>
          <thead>
            <tr>
              <th>Field Label</th>
              <th>Placeholder</th>
              <th>Field Type</th>
              <th>Required</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formFields.map((f: any, idx: number) => (
              <tr key={f.id || idx}>
                <td>
                  <input
                    type="text"
                    value={f.label}
                    onChange={(e) => {
                      const updated = [...formFields];
                      updated[idx] = { ...updated[idx], label: e.target.value };
                      updateField('formFields', updated);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={f.placeholder || ''}
                    onChange={(e) => {
                      const updated = [...formFields];
                      updated[idx] = { ...updated[idx], placeholder: e.target.value };
                      updateField('formFields', updated);
                    }}
                  />
                </td>
                <td>
                  <select
                    value={f.type || 'text'}
                    onChange={(e) => {
                      const updated = [...formFields];
                      updated[idx] = { ...updated[idx], type: e.target.value };
                      updateField('formFields', updated);
                    }}
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="textarea">Textarea</option>
                    <option value="dropdown">Dropdown</option>
                  </select>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={f.required}
                    onChange={(e) => {
                      const updated = [...formFields];
                      updated[idx] = { ...updated[idx], required: e.target.checked };
                      updateField('formFields', updated);
                    }}
                  />
                </td>
                <td>
                  <ToggleSwitch
                    $active={f.isEnabled}
                    type="button"
                    onClick={() => {
                      const updated = [...formFields];
                      updated[idx] = { ...updated[idx], isEnabled: !updated[idx].isEnabled };
                      updateField('formFields', updated);
                    }}
                  >
                    {f.isEnabled ? 'Enabled' : 'Disabled'}
                  </ToggleSwitch>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formFields.filter((_: any, i: number) => i !== idx);
                      updateField('formFields', updated);
                    }}
                    style={{ border: 'none', background: 'none', color: '#c00', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ItemTable>
      </SectionBox>

      {/* SECTION 9: ACTION BUTTONS / CTA */}
      <SectionBox>
        <h3>
          Action Buttons & CTA Labels
          <AddBtn onClick={handleAddButton}>
            <Plus size={14} /> + Add CTA Button
          </AddBtn>
        </h3>
        <ItemTable>
          <thead>
            <tr>
              <th>Button Text</th>
              <th>Button Link / URL</th>
              <th>Style</th>
              <th>Visibility</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buttons.map((b: any, idx: number) => (
              <tr key={b.id || idx}>
                <td>
                  <input
                    type="text"
                    value={b.text}
                    onChange={(e) => {
                      const updated = [...buttons];
                      updated[idx] = { ...updated[idx], text: e.target.value };
                      updateField('buttons', updated);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={b.link}
                    onChange={(e) => {
                      const updated = [...buttons];
                      updated[idx] = { ...updated[idx], link: e.target.value };
                      updateField('buttons', updated);
                    }}
                  />
                </td>
                <td>
                  <select
                    value={b.style || 'primary'}
                    onChange={(e) => {
                      const updated = [...buttons];
                      updated[idx] = { ...updated[idx], style: e.target.value };
                      updateField('buttons', updated);
                    }}
                  >
                    <option value="primary">Primary (Black)</option>
                    <option value="gold">Gold Accent</option>
                    <option value="secondary">Secondary (Outline)</option>
                  </select>
                </td>
                <td>
                  <ToggleSwitch
                    $active={b.isVisible}
                    type="button"
                    onClick={() => {
                      const updated = [...buttons];
                      updated[idx] = { ...updated[idx], isVisible: !updated[idx].isVisible };
                      updateField('buttons', updated);
                    }}
                  >
                    {b.isVisible ? 'Visible' : 'Hidden'}
                  </ToggleSwitch>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = buttons.filter((_: any, i: number) => i !== idx);
                      updateField('buttons', updated);
                    }}
                    style={{ border: 'none', background: 'none', color: '#c00', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ItemTable>
      </SectionBox>
    </EditorContainer>
  );
};

// 2. RETURNS & REFUNDS EDITOR
export const ReturnsEditor: React.FC<EditorProps> = ({ content, onChange }) => {
  const updateField = (key: string, val: any) => onChange({ ...content, [key]: val });

  return (
    <EditorContainer>
      <SectionBox>
        <h3>Return Policy Header</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Page Heading</label>
            <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Policy Introduction</label>
            <textarea rows={3} value={content.introduction || ''} onChange={(e) => updateField('introduction', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      <SectionBox>
        <h3>Eligibility & Timelines</h3>
        <FormGrid>
          <FormGroup>
            <label>Return Window (Days)</label>
            <input type="text" value={content.returnWindow || ''} onChange={(e) => updateField('returnWindow', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Refund Processing Time</label>
            <input type="text" value={content.refundTiming || ''} onChange={(e) => updateField('refundTiming', e.target.value)} />
          </FormGroup>

          <FormGroup $full>
            <label>Return Eligibility Criteria</label>
            <textarea rows={2} value={content.returnEligibility || ''} onChange={(e) => updateField('returnEligibility', e.target.value)} />
          </FormGroup>

          <FormGroup $full>
            <label>Non-Returnable Items</label>
            <textarea rows={2} value={content.nonReturnableItems || ''} onChange={(e) => updateField('nonReturnableItems', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      <SectionBox>
        <h3>Process & Gemological Inspection</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Return Step-by-Step Process</label>
            <textarea rows={3} value={content.returnProcess || ''} onChange={(e) => updateField('returnProcess', e.target.value)} />
          </FormGroup>

          <FormGroup $full>
            <label>Gemological Inspection Procedure</label>
            <textarea rows={3} value={content.inspectionProcess || ''} onChange={(e) => updateField('inspectionProcess', e.target.value)} />
          </FormGroup>

          <FormGroup $full>
            <label>Custom Jewellery & Bespoke Rules</label>
            <textarea rows={2} value={content.customJewelleryRules || ''} onChange={(e) => updateField('customJewelleryRules', e.target.value)} />
          </FormGroup>

          <FormGroup $full>
            <label>Loose Diamond Certificate Rules</label>
            <textarea rows={2} value={content.diamondRules || ''} onChange={(e) => updateField('diamondRules', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>
    </EditorContainer>
  );
};

// 3. SHIPPING & DELIVERY EDITOR
export const ShippingEditor: React.FC<EditorProps> = ({ content, onChange }) => {
  const updateField = (key: string, val: any) => onChange({ ...content, [key]: val });

  return (
    <EditorContainer>
      <SectionBox>
        <h3>Shipping Policy Header</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Page Heading</label>
            <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Introduction</label>
            <textarea rows={3} value={content.introduction || ''} onChange={(e) => updateField('introduction', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      <SectionBox>
        <h3>Logistics & Transit Insurance Details</h3>
        <FormGrid>
          <FormGroup>
            <label>Order Processing Time</label>
            <input type="text" value={content.processingTime || ''} onChange={(e) => updateField('processingTime', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Estimated Delivery Time</label>
            <input type="text" value={content.deliveryTime || ''} onChange={(e) => updateField('deliveryTime', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Courier Partners</label>
            <input type="text" value={content.courierInformation || ''} onChange={(e) => updateField('courierInformation', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Signature Requirement</label>
            <input type="text" value={content.signatureRequirement || ''} onChange={(e) => updateField('signatureRequirement', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Transit Insurance Protection</label>
            <textarea rows={2} value={content.insuranceInformation || ''} onChange={(e) => updateField('insuranceInformation', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>International Customs & Duty Rules</label>
            <textarea rows={2} value={content.customsInformation || ''} onChange={(e) => updateField('customsInformation', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>
    </EditorContainer>
  );
};

// 4. SUSTAINABILITY & CONFLICT FREE EDITOR
export const SustainabilityEditor: React.FC<EditorProps> = ({ content, onChange }) => {
  const updateField = (key: string, val: any) => onChange({ ...content, [key]: val });

  return (
    <EditorContainer>
      <SectionBox>
        <h3>Ethical Sourcing Header</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Page Heading</label>
            <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Introduction</label>
            <textarea rows={3} value={content.introduction || ''} onChange={(e) => updateField('introduction', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      <SectionBox>
        <h3>Diamond & Metal Sourcing Policies</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Kimberley Process & Conflict-Free Policy</label>
            <textarea rows={3} value={content.conflictFreePolicy || ''} onChange={(e) => updateField('conflictFreePolicy', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Natural Diamond Mine Sourcing</label>
            <textarea rows={2} value={content.naturalDiamonds || ''} onChange={(e) => updateField('naturalDiamonds', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Climate Neutral Lab-Grown Diamonds</label>
            <textarea rows={2} value={content.labGrownDiamonds || ''} onChange={(e) => updateField('labGrownDiamonds', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Recycled Gold & Platinum Manufacturing</label>
            <textarea rows={2} value={content.responsibleManufacturing || ''} onChange={(e) => updateField('responsibleManufacturing', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>
    </EditorContainer>
  );
};

// 5. FAQ MANAGER COMPONENT
export const FaqManagerComponent: React.FC = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any>(null);
  const [form, setForm] = useState({ question: '', answer: '', category: 'General', sortOrder: 0, isPublished: true });

  const loadFaqs = async () => {
    setLoading(true);
    try {
      const data = await api.getFaqs(category === 'ALL' ? undefined : category);
      setFaqs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingFaq) {
        await api.updateFaq(editingFaq.id, form);
      } else {
        await api.createFaq(form);
      }
      setShowModal(false);
      loadFaqs();
    } catch (e) {
      alert('Error saving FAQ');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ entry?')) return;
    try {
      await api.deleteFaq(id);
      loadFaqs();
    } catch (e) {
      alert('Error deleting FAQ');
    }
  };

  return (
    <EditorContainer>
      <SectionBox>
        <h3>
          Atelier FAQ Manager
          <AddBtn
            onClick={() => {
              setEditingFaq(null);
              setForm({ question: '', answer: '', category: 'General', sortOrder: faqs.length + 1, isPublished: true });
              setShowModal(true);
            }}
          >
            <Plus size={16} /> + Add FAQ Entry
          </AddBtn>
        </h3>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {['ALL', 'Diamonds', 'Jewellery', 'Orders', 'Shipping', 'Returns', 'Payments', 'Custom Jewellery', 'General'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: '1px solid #d9d3c7',
                background: category === cat ? '#1f1f1f' : '#fffdf9',
                color: category === cat ? '#fff' : '#1f1f1f',
                fontSize: '0.75rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <ItemTable>
          <thead>
            <tr>
              <th>Order</th>
              <th>Category</th>
              <th>Question</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: 20 }}>
                  Loading FAQs...
                </td>
              </tr>
            ) : (
              faqs.map((f) => (
                <tr key={f.id}>
                  <td>{f.sortOrder}</td>
                  <td>
                    <span style={{ padding: '2px 8px', background: '#f0ebe1', borderRadius: 4, fontSize: '0.7rem' }}>{f.category}</span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{f.question}</td>
                  <td>
                    <span style={{ color: f.isPublished ? '#137333' : '#777', fontWeight: 600, fontSize: '0.75rem' }}>
                      {f.isPublished ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button
                        onClick={() => {
                          setEditingFaq(f);
                          setForm({ question: f.question, answer: f.answer, category: f.category, sortOrder: f.sortOrder, isPublished: f.isPublished });
                          setShowModal(true);
                        }}
                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(f.id)} style={{ border: 'none', background: 'none', color: '#c00', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </ItemTable>
      </SectionBox>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fffdf9', padding: 24, borderRadius: 8, width: 500, maxWidth: '90%' }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', marginBottom: 16 }}>{editingFaq ? 'Edit FAQ' : 'Add FAQ'}</h3>
            <form onSubmit={handleSubmit}>
              <FormGroup style={{ marginBottom: 12 }}>
                <label>Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {['Diamonds', 'Jewellery', 'Orders', 'Shipping', 'Returns', 'Payments', 'Custom Jewellery', 'Wholesale', 'General'].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup style={{ marginBottom: 12 }}>
                <label>Question</label>
                <input type="text" required value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
              </FormGroup>
              <FormGroup style={{ marginBottom: 12 }}>
                <label>Answer</label>
                <textarea rows={4} required value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
              </FormGroup>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20 }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '8px 16px', background: '#eee', border: 'none', borderRadius: 4 }}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: '8px 16px', background: '#1f1f1f', color: '#fff', border: 'none', borderRadius: 4 }}>
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </EditorContainer>
  );
};

// 6. GENERIC RICH TEXT / POLICY EDITOR
export const GenericRichTextPolicyEditor: React.FC<EditorProps> = ({ content, onChange }) => {
  const updateField = (key: string, val: any) => onChange({ ...content, [key]: val });

  return (
    <EditorContainer>
      <SectionBox>
        <h3>Policy Page Header</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Page Title / Heading</label>
            <input type="text" value={content.heading || content.title || ''} onChange={(e) => updateField('heading', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Last Revision Date</label>
            <input type="text" value={content.lastUpdated || ''} onChange={(e) => updateField('lastUpdated', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      <SectionBox>
        <h3>Legal Policy Content (Rich Text / HTML Supported)</h3>
        <FormGroup $full>
          <label>Complete Terms / Policy Body</label>
          <textarea rows={16} value={content.content || ''} onChange={(e) => updateField('content', e.target.value)} style={{ fontFamily: 'monospace' }} />
        </FormGroup>
      </SectionBox>
    </EditorContainer>
  );
};

// 7. ABOUT US / QUALITY & VALUE EDITOR
export const AboutUsEditor: React.FC<EditorProps> = ({ content, onChange }) => {
  const updateField = (key: string, val: any) => onChange({ ...content, [key]: val });

  return (
    <EditorContainer>
      <SectionBox>
        <h3>About Us & Brand Heritage Header</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Page Heading</label>
            <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Subheading</label>
            <textarea rows={2} value={content.subheading || ''} onChange={(e) => updateField('subheading', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Introduction</label>
            <textarea rows={3} value={content.introduction || ''} onChange={(e) => updateField('introduction', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      <SectionBox>
        <h3>Brand Pillars & Craftsmanship</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Brand Story</label>
            <textarea rows={3} value={content.brandStory || ''} onChange={(e) => updateField('brandStory', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Our Core Values</label>
            <textarea rows={3} value={content.ourValues || ''} onChange={(e) => updateField('ourValues', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Master Craftsmanship</label>
            <textarea rows={3} value={content.craftsmanship || ''} onChange={(e) => updateField('craftsmanship', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Atelier Manufacturing Standards</label>
            <textarea rows={2} value={content.manufacturing || ''} onChange={(e) => updateField('manufacturing', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Diamond Excellence & Certification</label>
            <textarea rows={2} value={content.diamonds || ''} onChange={(e) => updateField('diamonds', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Why Choose Floksy Jewel</label>
            <textarea rows={2} value={content.whyFloksyJewel || ''} onChange={(e) => updateField('whyFloksyJewel', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>
    </EditorContainer>
  );
};

// 8. PRICE MATCH EDITOR
export const PriceMatchEditor: React.FC<EditorProps> = ({ content, onChange }) => {
  const updateField = (key: string, val: any) => onChange({ ...content, [key]: val });

  return (
    <EditorContainer>
      <SectionBox>
        <h3>Price Match Guarantee Header</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Page Heading</label>
            <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Subheading</label>
            <textarea rows={2} value={content.subheading || ''} onChange={(e) => updateField('subheading', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      <SectionBox>
        <h3>Eligibility & Verification Requirements</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Diamond Eligibility Rules</label>
            <textarea rows={2} value={content.eligibility || ''} onChange={(e) => updateField('eligibility', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>4Cs & Certification Matching Requirements</label>
            <textarea rows={2} value={content.requirements || ''} onChange={(e) => updateField('requirements', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Excluded Items & Retailers</label>
            <textarea rows={2} value={content.excludedProducts || ''} onChange={(e) => updateField('excludedProducts', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Gemologist Verification Process</label>
            <textarea rows={2} value={content.verificationProcess || ''} onChange={(e) => updateField('verificationProcess', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>CTA Button Text</label>
            <input type="text" value={content.buttonText || ''} onChange={(e) => updateField('buttonText', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>CTA Button Link</label>
            <input type="text" value={content.buttonUrl || ''} onChange={(e) => updateField('buttonUrl', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>
    </EditorContainer>
  );
};

// 9. WARRANTY EDITOR
export const WarrantyEditor: React.FC<EditorProps> = ({ content, onChange }) => {
  const updateField = (key: string, val: any) => onChange({ ...content, [key]: val });

  return (
    <EditorContainer>
      <SectionBox>
        <h3>Lifetime Warranty Header</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Page Heading</label>
            <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Subheading / Introduction</label>
            <textarea rows={3} value={content.subheading || content.introduction || ''} onChange={(e) => updateField('introduction', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      <SectionBox>
        <h3>Coverage Details & Claims</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Warranty Coverage Overview</label>
            <textarea rows={3} value={content.coverage || ''} onChange={(e) => updateField('coverage', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>What's Included (Prongs, Cleaning, Rhodium)</label>
            <textarea rows={2} value={content.whatsIncluded || ''} onChange={(e) => updateField('whatsIncluded', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>What's Excluded (Wear & Tear, Third-party alterations)</label>
            <textarea rows={2} value={content.whatsExcluded || ''} onChange={(e) => updateField('whatsExcluded', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Warranty Claim Procedure</label>
            <textarea rows={2} value={content.claimProcess || ''} onChange={(e) => updateField('claimProcess', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>
    </EditorContainer>
  );
};

// 10. INSURANCE EDITOR
export const InsuranceEditor: React.FC<EditorProps> = ({ content, onChange }) => {
  const updateField = (key: string, val: any) => onChange({ ...content, [key]: val });

  return (
    <EditorContainer>
      <SectionBox>
        <h3>Jewellery Insurance Header</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Page Heading</label>
            <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Introduction</label>
            <textarea rows={3} value={content.introduction || ''} onChange={(e) => updateField('introduction', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      <SectionBox>
        <h3>Insurance & Appraisal Information</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Appraisal Certificate Program</label>
            <textarea rows={2} value={content.insuranceInformation || ''} onChange={(e) => updateField('insuranceInformation', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Coverage Scope (Loss, Theft, Damage)</label>
            <textarea rows={2} value={content.coverage || ''} onChange={(e) => updateField('coverage', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Claims Process</label>
            <textarea rows={2} value={content.claims || ''} onChange={(e) => updateField('claims', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>
    </EditorContainer>
  );
};

// 11. SALE EXCLUSIONS EDITOR
export const SaleExclusionsEditor: React.FC<EditorProps> = ({ content, onChange }) => {
  const updateField = (key: string, val: any) => onChange({ ...content, [key]: val });

  return (
    <EditorContainer>
      <SectionBox>
        <h3>Sale Exclusions Header</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Page Heading</label>
            <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Introduction</label>
            <textarea rows={3} value={content.introduction || ''} onChange={(e) => updateField('introduction', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      <SectionBox>
        <h3>Exclusion Rules & Terms</h3>
        <FormGrid>
          <FormGroup $full>
            <label>General Exclusion Rules</label>
            <textarea rows={2} value={content.exclusionRules || ''} onChange={(e) => updateField('exclusionRules', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Excluded Product Types</label>
            <textarea rows={2} value={content.excludedProducts || ''} onChange={(e) => updateField('excludedProducts', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Excluded Categories</label>
            <textarea rows={2} value={content.excludedCategories || ''} onChange={(e) => updateField('excludedCategories', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>
    </EditorContainer>
  );
};

// 12. CUSTOM CAD / BESPOKE EDITOR
export const CustomCadEditor: React.FC<EditorProps> = ({ content, onChange }) => {
  const updateField = (key: string, val: any) => onChange({ ...content, [key]: val });

  return (
    <EditorContainer>
      <SectionBox>
        <h3>Bespoke Custom CAD Design Header</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Page Heading</label>
            <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Subheading</label>
            <textarea rows={2} value={content.subheading || ''} onChange={(e) => updateField('subheading', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Introduction</label>
            <textarea rows={3} value={content.introduction || ''} onChange={(e) => updateField('introduction', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      <SectionBox>
        <h3>4-Step CAD Design Process</h3>
        <FormGrid>
          <FormGroup>
            <label>Step 1 Heading</label>
            <input type="text" value={content.step1Heading || ''} onChange={(e) => updateField('step1Heading', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Step 1 Description</label>
            <input type="text" value={content.step1Description || ''} onChange={(e) => updateField('step1Description', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Step 2 Heading</label>
            <input type="text" value={content.step2Heading || ''} onChange={(e) => updateField('step2Heading', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Step 2 Description</label>
            <input type="text" value={content.step2Description || ''} onChange={(e) => updateField('step2Description', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Step 3 Heading</label>
            <input type="text" value={content.step3Heading || ''} onChange={(e) => updateField('step3Heading', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Step 3 Description</label>
            <input type="text" value={content.step3Description || ''} onChange={(e) => updateField('step3Description', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Step 4 Heading</label>
            <input type="text" value={content.step4Heading || ''} onChange={(e) => updateField('step4Heading', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Step 4 Description</label>
            <input type="text" value={content.step4Description || ''} onChange={(e) => updateField('step4Description', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      <SectionBox>
        <h3>Inquiry & File Upload Instructions</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Supported File Types</label>
            <input type="text" value={content.supportedFileTypes || ''} onChange={(e) => updateField('supportedFileTypes', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Expected Response Time</label>
            <input type="text" value={content.expectedResponseTime || ''} onChange={(e) => updateField('expectedResponseTime', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>
    </EditorContainer>
  );
};

// 13. DIAMOND VAULT EDITOR
export const DiamondVaultEditor: React.FC<EditorProps> = ({ content, onChange }) => {
  const updateField = (key: string, val: any) => onChange({ ...content, [key]: val });

  return (
    <EditorContainer>
      <InfoBanner>
        💎 <strong>Dynamic Diamond Inventory:</strong> Diamond inventory items are dynamically queried from the central Loose Diamond Database. Use this editor to customize the landing page copy, certification details, and banner text.
      </InfoBanner>

      <SectionBox>
        <h3>Diamond Vault Header</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Page Heading</label>
            <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Subheading</label>
            <textarea rows={2} value={content.subheading || ''} onChange={(e) => updateField('subheading', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Introduction</label>
            <textarea rows={3} value={content.introduction || ''} onChange={(e) => updateField('introduction', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      <SectionBox>
        <h3>Filter & Certification Descriptions</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Diamond Filter Guide Text</label>
            <textarea rows={2} value={content.filterDescription || ''} onChange={(e) => updateField('filterDescription', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>GIA / IGI Certification Guarantee</label>
            <textarea rows={2} value={content.certificationInformation || ''} onChange={(e) => updateField('certificationInformation', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>
    </EditorContainer>
  );
};

// 14. COLLECTION PAGE EDITOR (Rings, Earrings, Necklaces, Bracelets, Pendants, Collections)
export const CollectionPageEditor: React.FC<EditorProps> = ({ content, onChange }) => {
  const updateField = (key: string, val: any) => onChange({ ...content, [key]: val });

  return (
    <EditorContainer>
      <InfoBanner>
        ✨ <strong>Dynamic Collection Products:</strong> Products in this category are automatically fetched from the product catalog database. This editor manages collection headers, intro banners, and category SEO.
      </InfoBanner>

      <SectionBox>
        <h3>Category Collection Header</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Category Display Heading</label>
            <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Category Subheading / Description</label>
            <textarea rows={3} value={content.headingDescription || content.description || ''} onChange={(e) => updateField('headingDescription', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      <SectionBox>
        <h3>Category Intro & Banner</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Category Banner Image URL</label>
            <input type="text" value={content.bannerImage || ''} onChange={(e) => updateField('bannerImage', e.target.value)} placeholder="/assets/collections_banner.jpg" />
          </FormGroup>
          <FormGroup $full>
            <label>SEO Category Copy</label>
            <textarea rows={3} value={content.seoContent || ''} onChange={(e) => updateField('seoContent', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>
    </EditorContainer>
  );
};

// 15. CUSTOMER ACCOUNT EDITOR
export const CustomerAccountEditor: React.FC<EditorProps> = ({ content, onChange }) => {
  const updateField = (key: string, val: any) => onChange({ ...content, [key]: val });

  return (
    <EditorContainer>
      <InfoBanner>
        🔐 <strong>Live Authentication System:</strong> User accounts, orders, and security authentication are managed live by the backend Auth system. Use this editor to customize client portal text and support information.
      </InfoBanner>

      <SectionBox>
        <h3>Client Portal Header</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Portal Title</label>
            <input type="text" value={content.title || ''} onChange={(e) => updateField('title', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Welcome Heading</label>
            <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Portal Introduction</label>
            <textarea rows={2} value={content.introduction || ''} onChange={(e) => updateField('introduction', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>

      <SectionBox>
        <h3>Sign In & Support Text</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Login Prompt Text</label>
            <input type="text" value={content.loginText || ''} onChange={(e) => updateField('loginText', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Registration Prompt Text</label>
            <input type="text" value={content.registerText || ''} onChange={(e) => updateField('registerText', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Direct Support Contact Info</label>
            <input type="text" value={content.supportInformation || ''} onChange={(e) => updateField('supportInformation', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>
    </EditorContainer>
  );
};

// 16. BLOG MANAGER COMPONENT
export const BlogManagerComponent: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    author: 'Floksy Master Gemologist',
    featuredImage: '',
    excerpt: '',
    content: '',
    seoTitle: '',
    metaDescription: '',
    isPublished: true,
  });

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await api.getBlogPosts();
      setPosts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await api.updateBlogPost(editingPost.id, form);
      } else {
        await api.createBlogPost(form);
      }
      setShowModal(false);
      loadPosts();
    } catch (e) {
      alert('Error saving blog post');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await api.deleteBlogPost(id);
      loadPosts();
    } catch (e) {
      alert('Error deleting article');
    }
  };

  return (
    <EditorContainer>
      <SectionBox>
        <h3>
          Floksy Jewel Journal (Blog Manager)
          <AddBtn
            onClick={() => {
              setEditingPost(null);
              setForm({
                title: '',
                slug: '',
                author: 'Floksy Master Gemologist',
                featuredImage: '',
                excerpt: '',
                content: '',
                seoTitle: '',
                metaDescription: '',
                isPublished: true,
              });
              setShowModal(true);
            }}
          >
            <Plus size={16} /> + Create New Article
          </AddBtn>
        </h3>

        <ItemTable>
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Author</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: 20 }}>
                  Loading Journal articles...
                </td>
              </tr>
            ) : (
              posts.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600 }}>{p.title}</td>
                  <td style={{ fontFamily: 'monospace', color: '#666' }}>{p.slug}</td>
                  <td>{p.author}</td>
                  <td>
                    <span style={{ color: p.isPublished ? '#137333' : '#777', fontWeight: 600, fontSize: '0.75rem' }}>
                      {p.isPublished ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button
                        onClick={() => {
                          setEditingPost(p);
                          setForm({
                            title: p.title,
                            slug: p.slug,
                            author: p.author,
                            featuredImage: p.featuredImage || '',
                            excerpt: p.excerpt || '',
                            content: p.content,
                            seoTitle: p.seoTitle || '',
                            metaDescription: p.metaDescription || '',
                            isPublished: p.isPublished,
                          });
                          setShowModal(true);
                        }}
                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} style={{ border: 'none', background: 'none', color: '#c00', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </ItemTable>
      </SectionBox>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <div style={{ background: '#fffdf9', padding: 24, borderRadius: 8, width: 700, maxWidth: '95%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', marginBottom: 16 }}>{editingPost ? 'Edit Journal Article' : 'Create Article'}</h3>
            <form onSubmit={handleSubmit}>
              <FormGroup style={{ marginBottom: 12 }}>
                <label>Article Title</label>
                <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </FormGroup>

              <FormGrid>
                <FormGroup>
                  <label>URL Slug</label>
                  <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="autogenerated-if-empty" />
                </FormGroup>
                <FormGroup>
                  <label>Author Name</label>
                  <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
                </FormGroup>
              </FormGrid>

              <FormGroup style={{ marginBottom: 12 }}>
                <label>Featured Image URL</label>
                <input type="text" value={form.featuredImage} onChange={(e) => setForm({ ...form, featuredImage: e.target.value })} placeholder="/assets/journal_cover.jpg" />
              </FormGroup>

              <FormGroup style={{ marginBottom: 12 }}>
                <label>Excerpt Summary</label>
                <textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
              </FormGroup>

              <FormGroup style={{ marginBottom: 12 }}>
                <label>Article Body Content (HTML / Rich Text)</label>
                <textarea rows={10} required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} style={{ fontFamily: 'monospace' }} />
              </FormGroup>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20 }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '8px 16px', background: '#eee', border: 'none', borderRadius: 4 }}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: '8px 16px', background: '#1f1f1f', color: '#fff', border: 'none', borderRadius: 4 }}>
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </EditorContainer>
  );
};

// 17. DEFAULT PAGE EDITOR
export const DefaultPageEditor: React.FC<EditorProps> = ({ content, onChange }) => {
  const updateField = (key: string, val: any) => onChange({ ...content, [key]: val });

  return (
    <EditorContainer>
      <SectionBox>
        <h3>General Page Content</h3>
        <FormGrid>
          <FormGroup $full>
            <label>Page Heading</label>
            <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} />
          </FormGroup>
          <FormGroup $full>
            <label>Subheading / Introduction</label>
            <textarea rows={3} value={content.subheading || content.introduction || ''} onChange={(e) => updateField('subheading', e.target.value)} />
          </FormGroup>
        </FormGrid>
      </SectionBox>
    </EditorContainer>
  );
};
