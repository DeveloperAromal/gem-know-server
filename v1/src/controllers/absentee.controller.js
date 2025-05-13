import { getAbsenteesByClass } from "../services/absentee.service.js";

export async function fetchAbsentees(req, res) {
  try {
    const { classname } = req.query;
    const absentees = await getAbsenteesByClass(classname);
    res.json(absentees);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
