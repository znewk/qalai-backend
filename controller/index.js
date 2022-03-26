const db = require('../db')

class Controller {
    async getUniversities(req, res) {
        const universities = await db.query("SELECT universities.id, title, latitude, longitude, img_url, url, website_url, universities.country_id, city_id, description, specializations, living_expenses, entrance, study_schedule, logo_url, tuition_fees, countries.name as \"country_name\", cities.name as \"city_name\"\n" +
            "\tFROM public.universities\n" +
            "\tjoin cities on cities.id = universities.city_id \n" +
            "\tjoin countries on countries.id = universities.country_id")
        console.log('getUniversities request')
        res.json(universities.rows)
    }
    async getSpecializations(req, res) {
        const specializations = await db.query("SELECT * FROM public.specializations ORDER BY id ASC")
        console.log('getSpecializations request')
        res.json(specializations.rows)
    }
    async getUniversityById(req, res) {
        const {id} = req.body;
        const university = await db.query("SELECT universities.id, title, latitude, longitude, img_url, url, website_url, universities.country_id, city_id, description, specializations, living_expenses, entrance, study_schedule, logo_url, tuition_fees,  countries.name as \"country_name\", cities.name as \"city_name\"\n" +
            "\tFROM public.universities\n" +
            "\tjoin cities on cities.id = universities.city_id \n" +
            `\tjoin countries on countries.id = universities.country_id WHERE universities.id = ${id}`)
        console.log('getUniversityById request')
        res.json(university.rows)
    }
    async getUniversityByCountryId(req, res) {
        const {id} = req.body;
        const university = await db.query("SELECT universities.id, title, latitude, longitude, img_url, url, website_url, universities.country_id, city_id, description, specializations, living_expenses, entrance, study_schedule, logo_url, tuition_fees,  countries.name as \"country_name\", cities.name as \"city_name\"\n" +
            "\tFROM public.universities\n" +
            "\tjoin cities on cities.id = universities.city_id \n" +
            `\tjoin countries on countries.id = universities.country_id WHERE universities.country_id = ${id}`)
        console.log('getUniversityByCountryId request')
        res.json(university.rows)
    }
    async getCountries(req, res) {
        const universities = await db.query("SELECT id, name FROM public.countries")
        console.log('getCountries request')
        res.json(universities.rows)
    }
    async getFilteredUniversities(req, res) {
        console.log('req body',  req.body)

        let wherePool = []
        let whereText = ''

        const {country_id} = req.body;
        const {specialization_id} = req.body;
        const {language_id} = req.body;
        const {university_id} = req.body;

        if(country_id!==0) {
            wherePool.push(`country_id = ${country_id}`)
        }
        if(specialization_id!==0) {
            wherePool.push(`${specialization_id} = ANY(specializations_array)`)
        }
        if(language_id!==0){
            wherePool.push(`language_id = ${language_id}`)
        }
        if(university_id!==0){
            wherePool.push(`university_id = ${university_id}`)
        }

        whereText = wherePool.join(' and ')

        console.log('where text', whereText)

        let universities = await db.query('SELECT id, title, img_url, url, website_url, country_id, city_id, description, specializations, living_expenses, entrance, study_schedule, logo_url, tuition_fees, latitude, longitude, language_id, specializations_array\n' +
            `\tFROM public.universities where ` + whereText);

        console.log('getFilteredUniversities request')
        res.json(universities.rows)
    }
}

module.exports = new Controller();