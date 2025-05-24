import {
  getAllTeachers,
  getTeacherByUsername,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../services/teachers.service.js";

// GET /teachers → get all teachers
export async function getTeachers(req, res) {
  try {
    const teachers = await getAllTeachers();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /teacher?username=abc123 → get single teacher by username
export async function getTeacher(req, res) {
  try {
    const { username } = req.query;
    if (!username)
      return res.status(400).json({ error: "username is required" });

    const teacher = await getTeacherByUsername(username);
    res.json(teacher);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

// POST /teacher → create new teacher (username in body)
export async function addTeacher(req, res) {
  try {
    const newTeacher = await createTeacher(req.body);
    res.status(201).json(newTeacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// PUT /teacher?username=abc123 → update teacher by username
export async function editTeacher(req, res) {
  try {
    const { username } = req.query;
    if (!username)
      return res.status(400).json({ error: "username is required" });

    const updatedTeacher = await updateTeacher(username, req.body);
    res.json(updatedTeacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// DELETE /teacher?username=abc123 → delete teacher by username
export async function removeTeacher(req, res) {
  try {
    const { username } = req.query;
    if (!username)
      return res.status(400).json({ error: "username is required" });

    const response = await deleteTeacher(username);
    res.json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
