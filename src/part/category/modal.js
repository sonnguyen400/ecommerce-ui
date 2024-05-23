import {Modal,Button} from 'react-bootstrap';
import CategoryForm from './category-add-form';
import APIBase from '../../api/ApiBase';
import { useContext } from 'react';
import { GlobalContext } from '../../context';

function CategoryAddModal({state,setState,parent,addNestedCategory}) {
    const loader=useContext(GlobalContext);
    function addCategorySubmit(data){
        APIBase
            .post(`api/v1/category/${parent.id}`,JSON.stringify(data),{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(payload=>{
                console.log(payload.data)
                addNestedCategory(payload.data);
                return payload.data;
            }).catch(err=>{
                console.log(err)
                return err;
            }).finally((data)=>{
                loader("");
                setState(false);
            })
        
    }
    return ( 
    <Modal show={state} onHide={()=>setState(false)}>
        <Modal.Header closeButton>Add nested Category</Modal.Header>
        <Modal.Body>
            <CategoryForm submitHandler={addCategorySubmit}/>
        </Modal.Body>
    </Modal> );
}

export default CategoryAddModal;