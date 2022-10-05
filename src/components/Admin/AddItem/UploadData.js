import React from 'react';
import AWS from 'aws-sdk';
import "./UploadData.css";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import {
    MENUIMAGES,
  } from '../../redux/menus/ActionTypes';

const ACCESS_KEY =process.env.REACT_APP_IAM_USER_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_IAM_USER_SECRET;


AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
})

const UploadData = () => {
    let input,dragArea,file;
    const dispatch = useDispatch();
    const triggerInput=(e)=>{
        e.preventDefault();
        input = document.getElementById("getInput");
        dragArea = document.querySelector('.drag-area');
        input.click();
        
        input.addEventListener("change", function(){
            file = this.files[0];
            console.log("THE FILE ON SELECT:",file);
            showImage();
            dragArea.classList.add('active');
        })
    }
    
    if(dragArea)
    {
    
    dragArea.addEventListener('dragover', function(event){
        event.preventDefault()
        dragArea.classList.add('active');
    })
    
    dragArea.addEventListener('dragleave', function(){
        dragArea.classList.remove('active')
    })
    
    
    dragArea.addEventListener('drop', function(event){
        event.preventDefault();
        file = event.dataTransfer.files[0];
        showImage();
    })
    }
    
    const showImage=()=>{
        let fileType = file.type;
        console.log("the file selected in showImage function:",fileType)
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
        if(validExtensions.includes(fileType)){
            let fileReader = new FileReader();
            fileReader.onload = ()=>{
                let fileURL = fileReader.result;
                let imgTag = `<img src="${fileURL}" />`;
                dragArea.innerHTML=imgTag;
            }
            fileReader.readAsDataURL(file);
            dispatch({ type: MENUIMAGES, payload: file })
        }else{
           alert("not a supported image format");
           dragArea.classList.remove('active');
        }
    }

    return <React.Fragment>
    <div className="drag-area">
    </div>
    <input id="getInput" type="file" hidden />
    <button onClick={triggerInput} className="icon"><BsFillCloudArrowUpFill /></button>
    </React.Fragment>
}


export default UploadData;