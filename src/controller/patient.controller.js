import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../utils/logger.js'
import QUERY from '../query/patient.query.js';


const HttpStatus = {
    OK : {code : 200, status: 'OK'},
    CREATED : {code : 201, status: 'CREATED'},
    NO_CONTENT : {code : 204, status: 'NO_CONTENT'},
    BAD_REQUEST : {code : 400, status: 'BAD_REQUEST'},
    NOT_FOUND : {code : 404, status: 'NOT_FOUND'},
    INTERNAL_SERVER_ERROR : {code : 500, status: 'INTERNAL_SERVER_ERROR'},
};

export const getPatients = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching patients`);
    database.query(QUERY.SELECT_PATIENTS, (error, results) => {
        if(!results) {
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No patients Found`));
        }
        else{
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Patients retrieved', {patients: results }));
        }
    })
}

export const createPatients = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating Patient`);
    database.query(QUERY.CREATE_PATIENT, Object.values(req.body), (error, results) => {
        if(!results) {
            logger.error(error.message);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occured`));

        }
        else{
            const patient = { id: results.insertedId, ...req.body, created_at: new Date()};
            res.status(HttpStatus.CREATED.code)
            .send(new Response (HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Patient created`, {patient} ))

        }
    })
}

export const getPatient = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching Patient`);
    database.query(QUERY.SELECT_PATIENT, [re.params.id], (error, results) => {
        if(!results[0]) {
             res.status(HttpStatus.NOT_FOUND.code)
            .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Error occured`));

        }
        else{
            const patient = { id: results.insertedId, ...req.body, created_at: new Date()};
            res.status(HttpStatus.CREATED.code)
            .send(new Response (HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Patient created`, {patient} ))

        }
    })
}

export default HttpStatus;