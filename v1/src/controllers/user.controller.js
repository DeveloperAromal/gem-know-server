import {
  getAllUsers,
  getUserByadmno,
  createUser,
  updateUser,
  deleteUser,
} from "../services/user.service.js";

// GET /users → get all users
export async function getUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /user?admno=1234 → get single user by admno
export async function getUser(req, res) {
  try {
    const { admno } = req.query;
    if (!admno) return res.status(400).json({ error: "admno is required" });

    const user = await getUserByadmno(admno);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

// POST /user → create new user (admno in body)
export async function addUser(req, res) {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// PUT /user?admno=1234 → update user by admno
export async function editUser(req, res) {
  try {
    const { admno } = req.query;
    if (!admno) return res.status(400).json({ error: "admno is required" });

    const updatedUser = await updateUser(admno, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// DELETE /user?admno=1234 → delete user by admno
export async function removeUser(req, res) {
  try {
    const { admno } = req.query;
    if (!admno) return res.status(400).json({ error: "admno is required" });

    const response = await deleteUser(admno);
    res.json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
