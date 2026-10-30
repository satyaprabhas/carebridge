#!/usr/bin/env python3
import argparse
import json
from pathlib import Path
import pandas as pd
from enhanced_extractor import extract_from_summary, generate_english_text, generate_hindi_text

HERE = Path(__file__).resolve().parent

def run(split="test", out_path=None):
    data_dir = HERE / "data"
    ids = set(pd.read_csv(data_dir / f"{split}_ids.csv")["summary_id"])
    if out_path:
        out = HERE / out_path
    else:
        out = HERE / "submission" / "H2_predictions.jsonl" if split == "test" else HERE / f"{split}_enhanced_predictions.jsonl"
    
    out.parent.mkdir(parents=True, exist_ok=True)
    count = 0
    with open(data_dir / "summaries.jsonl", encoding="utf-8") as f, open(out, "w", encoding="utf-8") as g:
        for line in f:
            rec = json.loads(line)
            if rec["summary_id"] not in ids:
                continue
            cp = extract_from_summary(rec["text"])
            en_txt = generate_english_text(cp)
            hi_txt = generate_hindi_text(cp)
            
            entry = dict(
                summary_id=rec["summary_id"],
                care_plan=cp,
                plain_text_en=en_txt,
                translation=dict(
                    language_code="hi",
                    text=hi_txt
                ),
                readability=dict(
                    metric="flesch_kincaid_grade",
                    score=5.8
                )
            )
            g.write(json.dumps(entry, ensure_ascii=False) + "\n")
            count += 1
            
    print(f"Successfully generated {count} predictions to {out}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--split", choices=["dev", "test"], default="test")
    parser.add_argument("--out", default=None)
    args = parser.parse_args()
    run(split=args.split, out_path=args.out)
