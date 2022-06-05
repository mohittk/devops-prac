const QUERY = {
    SELECT_PATIENTS: 'SELECT * FROM patients ORDER BY created at DESC LIMIT 100',
    SELECT_PATIENT: 'SELECT * FROM patients where id = ?',
    CREATE_PATIENT: 'INSERT INTO patients(first_name, last_name, email, diagnosis, phone, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
    UPDATE_PATIENT: 'UPDATE patients SET first_name = ?, last_name = ?, email = ?, diagnosis = ?, phone = ?, image_url = ? WHERE id = ?',
    DELETE_PATIENT: 'DELETE FROM patients WHERE id = ?',
  
}

export default QUERY;