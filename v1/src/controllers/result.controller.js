import {
  getResultByAdmno,
  updateVerifiedStatus,
} from "../services/result.service.js";

export async function fetchResult(req, res) {
  try {
    const { admno } = req.query;
    const result = await getResultByAdmno(admno);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

export async function verifyResult(req, res) {
  try {
    const { admno } = req.query;
    const { verified } = req.body;

    const updated = await updateVerifiedStatus(admno, verified);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
