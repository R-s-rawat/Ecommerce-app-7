import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

// create category function
export const createCategoryController = async(req, res) =>{
try{
    //name keyword just defined as in categoryModel, if name is not provided by user then
    const {name} = req.body;
    if(!name){
        return res.status(401).send({message:'Name is required'})
    }
    // if user enters existing category
    const existingCategory = await categoryModel.findOne({name})
    if(existingCategory){
        return res.status(200).send({success:true, message:'Category already exists'})
    }
    // if category is new, name is also provided (by user- admin users)
    const category = await new categoryModel({name, slug:slugify(name)}).save()
    // because something get created so 201, not just 200
    res.status(201).send({
        success:true,
        message:'New category created',
        category
    })

}catch(error){
    console.log(error)
    res.status(500).send({success:false, error, message:'Error in category'})
}
}

// update category function
export const updateCategoryController = async(req, res) =>{
    try {
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:'Category updated successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while updating category'
        })
    }
}

// all category function (get all categories)
export const allCategoryController = async(req, res) =>{
try {
    const category = await categoryModel.find({})
    res.status(200).send({
        success: true,
        message: "All categories list",
        category
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        error,
        message:'Error while getting all categories'
    })  
}
}

// get single category function (get only 1 category)
export const singleCategoryController = async(req, res) =>{
    try {
        // const {slug} = req.params // directly pass to findOne
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success: true,
            message: 'Get single category successful',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting single category"
        })
        
    }
}

// delete category function
export const deleteCategoryController = async(req, res) =>{
    try {
        const {id} = req.params
        // not storing in any variable as intended, to not send that deleted category 
         await categoryModel.findByIdAndDelete(id)
         res.status(200).send({
            success:true,
            message:'Category deleted successfully'
         })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while deleting category'
        })
        
    }
}