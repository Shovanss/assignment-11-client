import { Helmet } from "react-helmet";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const CreateAssignment = () => {
    const [startDate, setStartDate] = useState(new Date());
    const {user} = useContext(AuthContext)
    const handleAddAssignment = e => {
      e.preventDefault()
      const form = e.target;
      const title = form.title.value
      const thumbnail_image_url = form.thumbnail_image_url.value
      const marks = form.marks.value
      const description = form.description.value
      const difficulty_level = form.difficulty_level.value
      const due_date = form.due_date.value
      const email = user.email
      const user_name = user.displayName
      
      
      
      
      const newAssignment = {title,thumbnail_image_url,marks,description,difficulty_level,due_date,
        user_name,email}
      console.log(newAssignment)
      fetch('http://localhost:5000/assignment',{
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newAssignment)
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        if(data.insertedId){
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Added!",
                text: "Your data has been added.",
                icon: "success"
              });
            }
          });
          form.reset()
        }
        
      })
    }
      return (
          <div>
             <Helmet>
                  
                  <title>Create New</title>
                  
              </Helmet>
            <Navbar></Navbar>
              <form onSubmit={handleAddAssignment} className="mx-auto lg:w-[1320px] md:w-[750px] w-[365px] mb-10 mt-10  rounded-2xl bg-[#f3f6fd] p-4">
              <div className='lg:flex mb-4'>
              <div className="form-control lg:w-1/2 ">
    <label className="label">
      <span className="label-text">Title</span>
    </label>
    <label className="input-group">
      
      <input type="text" name='title' placeholder="Name" className="input input-bordered w-full" />
    </label>
  </div>
              <div className="form-control lg:w-1/2 lg:ml-4">
    <label className="label">
      <span className="label-text">Image URL</span>
    </label>
    <label className="input-group">
      
      <input type="text" name='thumbnail_image_url' placeholder="Quantity" className="input input-bordered w-full" />
    </label>
  </div>
              </div>
              <div className='lg:flex mb-4'>
              <div className="form-control lg:w-1/2 ">
    <label className="label">
      Country
    </label>
    
    <select className="select select-bordered join-item" name='difficulty_level' required>
    <option disabled selected>Difficulty Level</option>
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
      
      
      
   
  </div>
             
  <div className="form-control mb-3">
                <p className="pb-2">Description</p>
                <textarea className="px-4 py-2 border-[1px] rounded-xl input-bordered" placeholder="Write A Short Description" name="description" id="" cols="30" rows="5"></textarea>
              </div>


              </div>
             
              <div className='lg:flex mb-3' >
              <div className="form-control lg:w-1/2 ">
    <label className="label">
      <span className="label-text">Marks</span>
    </label>
    <label className="input-group">
      
      <input type="number" name='marks' placeholder="Name" className="input input-bordered w-full" />
    </label>
  </div>
              <div className="form-control lg:w-1/2 lg:ml-4 lg:-translate-y-1">
    <label className="label">
      Seasonality
    </label>
    
    {/* <select className="select select-bordered join-item" name='seasonality' required>
    <option disabled selected>Select Season</option>
      <option>Summer</option>
      <option>Winter</option>
      <option>Spring</option>
      <option>Autumn</option>
    </select> */}

<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      
      
      
   
  </div>
              </div>
              <div className='lg:flex mb-3'>
             
              <div className="form-control lg:w-1/2 ">
    <label className="label">
      <span className="label-text">User Name</span>
    </label>
    <label className="input-group">
      
      <input type="text"  name='user_name' defaultValue={user.displayName} placeholder="Quantity" className="input input-bordered w-full" />
    </label>
  </div>
  <div className="form-control lg:w-1/2 lg:ml-4">
    <label className="label">
      <span className="label-text">User Email</span>
    </label>
    <label className="input-group">
      
      <input type="text" name='email' placeholder="Name" defaultValue={user.email} className="input input-bordered w-full" />
    </label>
  </div>
              </div>
              <input type="submit" value="Add" className="btn bg-[#007bff] text-white w-full mt-3 mb-3" />
              </form>
              <Link to='/'>
        <button className="btn bg-[#007bff] text-white mb-8 mt-8 items-center mx-auto flex">Go Back</button>
        </Link>
              <Footer></Footer>
          </div>
      );
};

export default CreateAssignment;