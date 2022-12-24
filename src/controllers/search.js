

const getSimilitudes = async (req, res) => {
    try {
        const {name}=req.query
        
          
        res.status(200).json({
            msg:"success"   });
  
    } catch (error) {
      console.log(error);
    }
  };

  module.exports = {getSimilitudes}