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
        const {country_id} = req.body;
        const {university_id} = req.body;

        let universities = {};

        if(country_id!=0 && university_id!=0) {
            universities = await db.query("SELECT universities.id, title, latitude, longitude, img_url, url, website_url, universities.country_id, city_id, description, specializations, living_expenses, entrance, study_schedule, logo_url, tuition_fees,  countries.name as \"country_name\", cities.name as \"city_name\"\n" +
                "\tFROM public.universities\n" +
                "\tjoin cities on cities.id = universities.city_id \n" +
                `\tjoin countries on countries.id = universities.country_id WHERE universities.country_id=${country_id} and universities.id=${university_id}`)
        } else if (country_id===0 && university_id===0) {
            universities = await db.query("SELECT universities.id, title, latitude, longitude, img_url, url, website_url, universities.country_id, city_id, description, specializations, living_expenses, entrance, study_schedule, logo_url, tuition_fees,  countries.name as \"country_name\", cities.name as \"city_name\"\n" +
                "\tFROM public.universities\n" +
                "\tjoin cities on cities.id = universities.city_id \n" +
                "\tjoin countries on countries.id = universities.country_id")
        } else if(country_id!=0 && university_id===0) {
            universities = await db.query("SELECT universities.id, title, latitude, longitude, img_url, url, website_url, universities.country_id, city_id, description, specializations, living_expenses, entrance, study_schedule, logo_url, tuition_fees,  countries.name as \"country_name\", cities.name as \"city_name\"\n" +
                "\tFROM public.universities\n" +
                "\tjoin cities on cities.id = universities.city_id \n" +
                `\tjoin countries on countries.id = universities.country_id WHERE universities.country_id=${country_id}`)
        } else if(university_id!=0 && country_id===0) {
            universities = await db.query("SELECT universities.id, title, latitude, longitude, img_url, url, website_url, universities.country_id, city_id, description, specializations, living_expenses, entrance, study_schedule, logo_url, tuition_fees,  countries.name as \"country_name\", cities.name as \"city_name\"\n" +
                "\tFROM public.universities\n" +
                "\tjoin cities on cities.id = universities.city_id \n" +
                `\tjoin countries on countries.id = universities.country_id WHERE universities.id=${country_id}`)
        }

        console.log('getFilteredUniversities request')
        res.json(universities.rows)
    }
}

module.exports = new Controller();