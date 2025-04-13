const { pool } = require('../db');

async function fillSpecializationsForUniversities(universities) {
  for (let university of universities) {
    if (Array.isArray(university.specializations) && university.specializations.length > 0) {
      const specs = await pool.query(`
        SELECT id, name
        FROM specializations
        WHERE id = ANY($1)
      `, [university.specializations]);
      university.specializations = specs.rows;
    } else {
      university.specializations = [];
    }
  }
  return universities;
}

module.exports = {
  getUniversities: async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT u.*, c.name AS country_name, ci.name AS city_name, l.name AS language_name 
        FROM universities u 
        LEFT JOIN countries c ON u.country_id = c.id 
        LEFT JOIN cities ci ON u.city_id = ci.id 
        LEFT JOIN languages l ON u.language_id = l.id
      `);
      const universities = await fillSpecializationsForUniversities(result.rows);
      res.json(universities);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },

  getCountries: async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM countries');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },

  getSpecializations: async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM specializations');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },

  getUniversityById: async (req, res) => {
    const { id } = req.body;
    try {
      const result = await pool.query(`
        SELECT u.*, c.name AS country_name, ci.name AS city_name, l.name AS language_name 
        FROM universities u 
        LEFT JOIN countries c ON u.country_id = c.id 
        LEFT JOIN cities ci ON u.city_id = ci.id 
        LEFT JOIN languages l ON u.language_id = l.id 
        WHERE u.id = $1
      `, [id]);

      if (result.rows.length === 0) return res.status(404).send('University not found');

      const [university] = await fillSpecializationsForUniversities(result.rows);
      res.json([university]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },

  createNewApplication: async (req, res) => {
    const { name, phone, universityId } = req.body;
    try {
      await pool.query(
        'INSERT INTO applications (name, phone, university_id, created_at) VALUES ($1, $2, $3, NOW())',
        [name, phone, universityId || null]
      );
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },

  getUniversityByCountryId: async (req, res) => {
    const { id } = req.body;
    try {
      const result = await pool.query(`
        SELECT u.*, c.name AS country_name, ci.name AS city_name, l.name AS language_name 
        FROM universities u 
        LEFT JOIN countries c ON u.country_id = c.id 
        LEFT JOIN cities ci ON u.city_id = ci.id 
        LEFT JOIN languages l ON u.language_id = l.id 
        WHERE u.country_id = $1
      `, [id]);

      const universities = await fillSpecializationsForUniversities(result.rows);
      res.json(universities);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },

  getFilteredUniversities: async (req, res) => {
    const { country_id, specialization_id, language_id, university_id } = req.body;

    let query = `
      SELECT DISTINCT u.*, c.name AS country_name, ci.name AS city_name, l.name AS language_name 
      FROM universities u 
      LEFT JOIN countries c ON u.country_id = c.id 
      LEFT JOIN cities ci ON u.city_id = ci.id 
      LEFT JOIN languages l ON u.language_id = l.id 
      WHERE 1=1
    `;
    const params = [];
    let index = 1;

    if (country_id !== 0) {
      query += ` AND u.country_id = $${index++}`;
      params.push(country_id);
    }
    if (specialization_id !== 0) {
      query += ` AND $${index} = ANY(u.specializations)`;
      params.push(specialization_id);
      index++;
    }
    if (language_id !== 0) {
      query += ` AND u.language_id = $${index++}`;
      params.push(language_id);
    }
    if (university_id !== 0) {
      query += ` AND u.id = $${index++}`;
      params.push(university_id);
    }

    try {
      const result = await pool.query(query, params);
      const universities = await fillSpecializationsForUniversities(result.rows);
      res.json(universities);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
};