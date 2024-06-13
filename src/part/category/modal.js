import { Modal, Button, notification } from 'antd';
import CategoryForm from './category-add-form';
import APIBase from '../../api/ApiBase';
import { useContext } from 'react';
import { GlobalContext } from '../../context';

function CategoryAddModal({ state, setState, parent, addNestedCategory }) {
    const [context, notificationContext] = notification.useNotification();
    function addCategorySubmit(data) {
        APIBase
            .post(`api/v1/category/${parent.id}`, [data], {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(payload => {
                addNestedCategory(payload.data);
                return payload.data;
            }).catch(err => {
                notification.error({
                    message: "Error",
                    description: err
                })
                return err;
            }).finally((data) => {
                setState(false);
            })

    }
    return (
        <Modal footer={null} title="Add nested Category" open={state} onCancel={() => setState(false)}>
            <CategoryForm submitHandler={addCategorySubmit} />
        </Modal>);
}

export default CategoryAddModal;