import { Modal, Button } from 'antd';
import CategoryForm from './category-add-form';
import APIBase from '../../api/ApiBase';
import { useContext } from 'react';
import { GlobalContext } from '../../context';

function CategoryAddModal({ state, setState, parent, addNestedCategory }) {
    const loader = useContext(GlobalContext);
    function addCategorySubmit(data) {
        APIBase
            .post(`api/v1/category/${parent.id}`, JSON.stringify(data), {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(payload => {
                console.log(payload.data)
                addNestedCategory(payload.data);
                return payload.data;
            }).catch(err => {
                console.log(err)
                return err;
            }).finally((data) => {
                loader("");
                setState(false);
            })

    }
    return (
        <Modal title="Add nested Category" open={state} onCancel={() => setState(false)}>
            <CategoryForm submitHandler={addCategorySubmit} />
        </Modal>);
}

export default CategoryAddModal;