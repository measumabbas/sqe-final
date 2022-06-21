import axios from 'axios';
import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react';
import { Context } from '../Context/Context';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Courses = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [course, setCourse] = useState('')
  
    const [courses, setCourses] = useState([]);
    const [total, setTotal] = useState([]);
    const [specCourse, setSpecCourse] = useState([]);
  
    const [courseToUpdate,setCourseToUpdate] = useState('')
  
    // const [value, setValue] = useState('');
  
    const selectRef = useRef();
    const resetRef = useRef();
    const btnRef = useRef();
    const updateRef = useRef();
  
  const user = JSON.parse(localStorage.getItem('user'))
    // const handleChange = (e) => {
    //   setValue(e.target.value);
    // };

    console.log(user.name);
    useEffect(() => {
  
      const getAllCourses = async () => {
        const response = await axios.get('http://localhost:5000/api/register/getcourses');
        setCourses(response.data);
        getAllCourse();
      }
  
      getAllCourses();
  
    }, []);
  
    var arr = [];
    const addToCourses = (course) => {
      arr = [course, ...total];
      // console.log(arr)
      // console.log(course);
      setTotal(arr)
      // console.log(total);
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      addToCourses(selectRef.current.value);
      // localStorage.setItem("courses",JSON.stringify(arr));
      let confirm = window.confirm('Do you want to select another course');
      // console.log(confirm);
      if (confirm) {
        resetRef.current.click()
      } else {
        postCourses();
        getAllCourse();
      }
    }
  
    const getAllCourse = async () => {
      try {
        const course = await axios.post('http://localhost:5000/api/register/getsecscourses', {
          registration: user.registration
        });
        setSpecCourse(course.data[0].courses);

  
      } catch (error) {
        // Swal.fire({

        setSpecCourse([]);
      }
    }
  
    const postCourses = async () => {
      try {
        const result = await axios.post('http://localhost:5000/api/register/course', {
          registration: user.registration,
          courses: arr
        })
        // setInputDiv(false);
        // setCourseDiv(true)
        Swal.fire({
            position: 'center-center',
            icon: 'success',
            title: 'Courses added successfully',
            showConfirmButton: false,
            timer: 2000
        })
      } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Some Error Occured'
        })
      }
    }
  
    const handleDelete = async (e) => {
      let parent = ReactDOM.findDOMNode(e.target).parentNode.parentNode;
      let courseToDelete = parent.children[0].textContent
  
      let confirm = window.confirm('Are You sure You Want to delete the course');
  
      if (confirm) {
  
        try {
  
          const res = await axios.delete('http://localhost:5000/api/register/delete', {
            data: {
              name: courseToDelete,
              registration: user.registration
            }
          });
  
          if (res.status === 200) {
            getAllCourse();
            Swal.fire({
                position: 'center-center',
                icon: 'success',
                title: 'Course Deleted Successfully',
                showConfirmButton: false,
                timer: 2000
            })
          } else {
            Swal.fire({
                icon: 'error',
                title: 'Some Error Occured'
            })
          }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Internal Server Error'
            })
        }
      }
    }
  
    const handleDrop = async () => {
  
      let confirm = window.confirm('Do you want delete current courses and enroll again ?');
  
      if (confirm) {
  
        try {
          const res = await axios.delete('http://localhost:5000/api/register/deleteall', {
            data: {
              registration: user.registration
            }
          })
  
          if (res.status === 200) {
            Swal.fire({
                position: 'center-center',
                icon: 'success',
                title: 'Courses Dropped Successfully',
                showConfirmButton: false,
                timer: 2000
            })
            window.location.reload()
          } else {
            Swal.fire({
                icon: 'error',
                title: 'Some Error Occurred'
            })
          }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Internal Server Error'
            })
        }
      } else {
  
      }
    }
  
    const handleUpdate = (e) => {
      btnRef.current.click();
      let parent = ReactDOM.findDOMNode(e.target).parentNode.parentNode;
      let courseToUpdate = parent.children[0].textContent;
      setCourseToUpdate(courseToUpdate);
      // console.log(courseToUpdate);
    }
  
    const handleUpdateForm = async(e)=>{
      e.preventDefault();
  
      try {
        
        const result = await axios.put('http://localhost:5000/api/register/update',{
          name:courseToUpdate,
          registration:user.registration,
          update:updateRef.current.value
        });
        const anotherResult = await axios.put('http://localhost:5000/api/register/update',{
          name:courseToUpdate,
          registration:user.registration,
          update:updateRef.current.value
        });
        if(anotherResult.status === 200){
          getAllCourse();
          Swal.fire({
            position: 'center-center',
            icon: 'success',
            title: 'Course Updated Successfully',
            showConfirmButton: false,
            timer: 2000
        })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Some Error Occured'
            })
        }
      } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Internal Server Error'
        })
      }
    }
      return (
          <div className='container my-5'>
              <form onSubmit={handleSubmit}>
  
  
                  <label style={{ display: 'block', marginBottom: '15px', fontSize: '20px', fontWeight: 'bold' }} htmlFor="course">Choose a course:</label>
  
                  <select name="course" id="course" style={{ diplay: 'block' }} ref={selectRef}>
                      <option></option>
                      {
  
                          courses && courses.map((course, index) => (
                              <option key={index}>{course.courseName}</option>
                          ))
                      }
                  </select>
  
                  <div className="buttons">
  
                      <button ref={resetRef} type='reset'>Reject</button>
                      <button>Accept</button>
                  </div>
  
              </form>
  
  
  
              <div className="courses-container">
                  <div className="heading">
  
                      <h1>List Of Courses You are enrolled in</h1>
                      <div className="delete-all" onClick={handleDrop}>Re Enroll To courses</div>
                  </div>
  
                  <div className="courses">
                      {
                          specCourse && specCourse.map((course, index) => (
  
                              <div className="course" key={index} >
                                  <h3>{course}</h3>
                                  <div className="options">
                                      <div className="delete" onClick={handleDelete}>delete</div>
                                      <div className="update" onClick={handleUpdate}>update</div>
                                  </div>
                              </div>
                          ))
                      }
                  </div>
              </div>
  
              <Button style={{display:'none'}} variant="primary" onClick={handleShow} ref={btnRef}>
          Launch static backdrop modal
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleUpdateForm}>
              <label style={{ display: 'block', marginBottom: '15px', fontSize: '20px', fontWeight: 'bold' }} htmlFor="course">Choose a course you want to update with:</label>
  
              <select name="course" id="course" style={{ diplay: 'block' }} ref={updateRef}>
                <option></option>
                {
  
                  courses && courses.map((course, index) => (
                    <option key={index}>{course.courseName}</option>
                  ))
                }
              </select>
              <Button type='submit' style={{display:'block',marginTop:'20px'}} variant="secondary" onClick={handleClose}>
                Update
              </Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
          </div>
      )
}

export default Courses