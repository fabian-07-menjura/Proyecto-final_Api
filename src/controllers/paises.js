const axios = require("axios");
const { Country } = require("../db.js");
let paisesLatam = ["Argentina","Bolivia"," Brasil","Chile","Colombia","Costa Rica","Cuba","Ecuador","El Salvador","Guayana Francesa","Granada","Guatemala","Guayana","Haití","Honduras","México","Nicaragua","Paraguay","Panamá","Perú","Puerto Rico","República Dominicana","Uruguay","Venezuela",]

const getApiCountries = async (req, res) => {
  try {
    const apiInfo = await axios.get("https://restcountries.com/v3/all");
    const apiCountries = await apiInfo.data.map((ele) => {
      return {
        name: ele.name.common,
        flag: ele.flags[0],
      };
    });
    let paisesApi = await apiCountries.filter(ele=>{
      if(paisesLatam.includes(ele.name)){
        //console.log("deberia funcionar",ele.name)
        return{
          name:ele.name,
          flag:ele.flag,
        }
        
      }
    });

    paisesApi.forEach((el) => {
      Country.findOrCreate({
        where: { name: el.name, flag: el.flag },
      });
    });
    const allPaises = await Country.findAll();

    res.send(allPaises);
  } catch (error) {
    console.log("Sucedio un error en /paises: ", error);
  }
};

module.exports = { getApiCountries };

