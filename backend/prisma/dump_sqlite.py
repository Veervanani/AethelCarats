import sqlite3
import json
import os

db_path = r"d:\Floksy Jewel\backend\prisma\dev.db.backup"
out_path = r"d:\Floksy Jewel\backend\prisma\sqlite_dump.json"

conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

tables_query = "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma_%';"
tables = [row['name'] for row in cur.execute(tables_query).fetchall()]

dump_data = {}
row_counts = {}

for table in tables:
    rows = cur.execute(f'SELECT * FROM "{table}"').fetchall()
    row_list = []
    for row in rows:
        dict_row = dict(row)
        row_list.append(dict_row)
    dump_data[table] = row_list
    row_counts[table] = len(row_list)

with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(dump_data, f, ensure_ascii=False, indent=2)

print("--- SQLITE DUMP SUMMARY ---")
for t, count in sorted(row_counts.items()):
    print(f"Table '{t}': {count} rows")

print(f"\nDump saved successfully to {out_path}")
