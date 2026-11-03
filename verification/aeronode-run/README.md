# Fresh AeroNode verification

Executed 3 November 2026 in the existing C:/AeroNode checkout, commit recorded in commit.txt. This is the older Phase 1-3 checkout, not the later GitHub adaptive-runtime revision. No source, accepted checkpoint, or reference artifact was replaced. Fresh build and model/export tests passed. Full validation reproduced all accepted correct-count totals on 3,925 images. Four-head ONNX export parity passed on ten images spanning ten classes; output model hash matches the reference.

Initial Phase-1 parity failed because the existing simple_model.onnx has incompatible tensor shapes. The reference was preserved. Exporting the deterministic tiny model into the unique run directory recovered the check; 500 iterations passed with 1.4901161193847656e-08 maximum error. Timing belongs only to that tiny model and is not presented as an adaptive classifier result.

Raw local run: C:\AeroNode\output\portfolio-test-20261103-130753
Large generated ONNX files, weights, datasets and build outputs remain outside the portfolio repository. Logs and JSON are retained here; the public page consumes the concise measured report.
