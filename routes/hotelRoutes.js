const express = require("express");
const dotenv = require("dotenv")
const User = require('../models/User'); 
const Hotel = require('../models/Hotel');

dotenv.config();

const router = express.Router();

router.post('/create-hotel', async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, error: 'Unauthorized User!' });
    }

    const hotel = await Hotel.create({});
    console.log(hotel);

    return res.status(200).json({ success: true, message: "Hotel Created", hotel });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/get-hotel',async(req,res)=>{
  try {
    let hotel = await Hotel.findById('66221c2cce3f47d7d06cd26a');
    res.status(200).json({ success:true, hotel });
  } catch (error) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
})

router.post('/update-hero-image', async (req, res) => {
  console.log("hi");
  try {
    const { imgUrl, userId, hotelId } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, error: 'Unauthorized User!' });
    }

    let hotel = await Hotel.findById(hotelId); // Ensure to await the result of findById
    if (!hotel) {
      return res.status(404).json({ success: false, error: 'Hotel Not Found!' });
    }

    hotel.heroImage = imgUrl;
    await hotel.save(); // Ensure to await the save operation

    return res.status(200).json({ success: true, message: "Hero Image Updated" });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});


router.post('/update-about-image', async (req, res) => {
    try {
      const { imgUrl,userId,hotelId } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ success: false, error: 'Unauthorized User!' });
      }
  
      let hotel = await Hotel.findById(hotelId);
      if(!hotel){
          return res.status(402).json({ success: false, error: 'Hotel Not Found!' });
      }
  
      hotel.aboutImage=imgUrl;
      await hotel.save();
      return res.status(200).json({ success: true, message: "About Image Updated" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
});

router.post('/update-hotel-images', async (req, res) => {
   console.log('hi')
  try {
    const { userId, imagesData, hotelId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, error: 'Unauthorized User!' });
    }
    
    const hotel =await  Hotel.findById(hotelId);
    if(!hotel){
        return res.status(402).json({ success: false, error: 'Hotel Not Found!' });
    }

    hotel.hotelImages=imagesData;
    await hotel.save();
    
    return res.status(200).json({ success: true, message: "Images Updated" });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});


router.post('/update-bottom-banner', async (req, res) => {
    try {
      const { imgUrl,userId,hotelId } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ success: false, error: 'Unauthorized User!' });
      }
  
      let hotel = await Hotel.findById(hotelId);
      if(!hotel){
          return res.status(402).json({ success: false, error: 'Hotel Not Found!' });
      }
  
    hotel.bottomBanner=imgUrl;
     await hotel.save();
      return res.status(200).json({ success: true, message: "Bottom Banner Image Updated" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
});

router.post('/update-contacts', async (req, res) => {
  console.log("hi")
    try {
      const { contacts,userId,hotelId } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ success: false, error: 'Unauthorized User!' });
      }
  
      let hotel =await Hotel.findById(hotelId);
      if(!hotel){
          return res.status(402).json({ success: false, error: 'Hotel Not Found!' });
      }
  
      hotel.contacts=contacts;
      
     await hotel.save();
     
      return res.status(200).json({ success: true, message: "Contacts Updated" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
});
router.post('/update-default-price', async (req, res) => {
    try {
      const { price,userId,hotelId } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ success: false, error: 'Unauthorized User!' });
      }
  
      let hotel = await Hotel.findById(hotelId);
      
      if(!hotel){
          return res.status(402).json({ success: false, error: 'Hotel Not Found!' });
      }
  
      hotel.defaultPrice=price;
      await hotel.save();
      return res.status(200).json({ success: true, message: "Default Price Updated" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/get-default-price/:hotelId', async (req, res) => {
  try {
    const { hotelId } = req.params;
    console.log(hotelId);
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }
    const defaultPrice = hotel.defaultPrice;

    res.status(200).json({ success:true, defaultPrice });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



router.post('/update-features-content', async (req, res) => {
  try {
    const { title, userId, hotelId, content } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, error: 'Unauthorized User!' });
    }

    let hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(402).json({ success: false, error: 'Hotel Not Found!' });
    }

    // Find the feature with matching title
    const featureIndex = hotel.featuresContent.findIndex(feature => feature.title === title);

    if (featureIndex === -1) {
      return res.status(404).json({ success: false, error: 'Feature Not Found!' });
    }

    // Update the content of the found feature
    hotel.featuresContent[featureIndex].content = content;

    // Save the updated hotel object
    await hotel.save();

    return res.status(200).json({ success: true, message: 'Features Content Updated Successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});


router.post('/create-features-content', async (req, res) => {
  try {
    const { title,userId,hotelId,content } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, error: 'Unauthorized User!' });
    }

    let hotel = await Hotel.findById(hotelId);
    
    if(!hotel){
        return res.status(402).json({ success: false, error: 'Hotel Not Found!' });
    }

    hotel.featuresContent.push({
      title:title,
      content:content
    })

    await hotel.save();
    return res.status(200).json({ success: true, message: "Feature Content Added" });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/get-hotel-features', async (req, res) => {
  try {
    const {userId,hotelId} = req.body;

    const user = await User.findById(userId);
    console.log(user)
    console.log(userId)
    if (!user) {
      return res.status(400).json({ success: false, error: 'Unauthorized User!' });
    }

    let hotel = await Hotel.findById(hotelId);
    
    if(!hotel){
        return res.status(402).json({ success: false, error: 'Hotel Not Found!' });
    }

    const features = hotel.featuresContent;

    return res.status(200).json({ success: true, message: "Features Fetched", features });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
