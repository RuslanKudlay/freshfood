import React, { useEffect, useState } from "react";
import './Role.css';
import { RoleModel } from "../../../../models/roleModel";
import { Alert, Button, Form } from 'react-bootstrap';
import { deleteRole, getListRoles, updateRole, createRole } from "../../../../services/role.service";

const Role = () => {

    const [roleModel, setRoleModel] = useState(new RoleModel("", ""));
    const [editedRoleValue, setEditRoleValue] = useState(new RoleModel("", ""));
    const [roleList, setRoleList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingItemId, setEditingItemId] = useState(null);

    useEffect(() => {
        const getRoleList = async () => {
            try {
                const response = await getListRoles();
                if (response.data) {
                    setRoleList(response.data);
                }
            }
            catch (ex) {
                console.log("GetListRoles exception: ", ex);
            }
        }
        getRoleList();
    }, [roleModel]);


    const onChangeAddNameRole = (e) => {
        const roleModel = new RoleModel("", e.target.value);
        setRoleModel(roleModel);
    }

    const addRole = () => {
        const createRoleAsync = async () => {
            try {
                const response = await createRole(roleModel);
                if (response.data) {
                    const roleModel = new RoleModel("", "");
                    setRoleModel(roleModel);
                }
            }
            catch (ex) {
                console.log("AddRoleException: ", ex);
            }
        }
        createRoleAsync();
    }

    const handleDelete = (itemId) => {
        const deleteRoleByIdAsync = async () => {
            try {
                const response = await deleteRole(itemId);
                if (response.data) {
                    setRoleList((prevList) =>
                        prevList.filter((item) => item.id !== itemId)
                    );
                }
            } catch (error) {
                console.error('Error deleting role', error);
            }
        }
        deleteRoleByIdAsync();
    };

    const showEditPanel = (itemId) => {
        setIsEditing(!isEditing);
        setEditingItemId(itemId);
    }

    const onChangeEditRoleValue = (e) => {
        const editedRoleValue = new RoleModel("", e.target.value);
        setEditRoleValue(editedRoleValue);
    }

    const saveEditedRole = (itemId) => {
        const role = roleList.find(item => item.id === itemId);
        role.name = editedRoleValue.name;

        const updateRoleAsync = async () => {
            try {
                const response = await updateRole(role);
                if (response.data) {
                    const role = new RoleModel(response.data.id, response.data.name);
                    setRoleModel(role);

                    setIsEditing(!isEditing);
                    setEditingItemId(null);
                }
            }
            catch (ex) {
                console.log("SaveEditedRole exception: ", ex);
            }
        }
        updateRoleAsync();
    }

    return (
        <div className="role__container">
            <div className="main__text-wrapper">
                <label className="main__text">Сторінка ролів</label>
            </div>

            {roleList.length > 0 ?
                <div className="page__content">
                    <div className="table__wrapper">
                        <div className="table__block">
                            <table className="table" striped bordered hover>
                                <thead className="table__header">
                                    <tr>
                                        <th>Id</th>
                                        <th>Назва</th>
                                        <th colSpan={2}>Дії</th>
                                    </tr>
                                </thead>
                                <tbody className="table__body">
                                    {roleList.map((item) => {
                                        const isEditingItem = isEditing && editingItemId === item.id;

                                        return (
                                            <tr key={item.id}>
                                                {isEditingItem ? (
                                                    <React.Fragment key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>
                                                            <Form>
                                                                <Form.Group>
                                                                    <Form.Control onChange={onChangeEditRoleValue} defaultValue={item.name} type="text" />
                                                                </Form.Group>
                                                            </Form>
                                                        </td>
                                                        <td>
                                                            <Button variant="success" onClick={() => saveEditedRole(item.id)}>
                                                                Зберегти
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <Button variant="light" onClick={() => showEditPanel(item.id)}>
                                                                Назад
                                                            </Button>
                                                        </td>
                                                    </React.Fragment>
                                                ) : (
                                                    <React.Fragment key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            <Button variant="warning" onClick={() => showEditPanel(item.id)}>
                                                                Редагувати
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <Button onClick={() => handleDelete(item.id)} variant="danger">
                                                                Видалити
                                                            </Button>
                                                        </td>
                                                    </React.Fragment>
                                                )}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="role__form-wrapper">
                        <div className="role__title-wrapper">
                            <label className="role__title">Створити роль</label>
                        </div>
                        <div className="role__form">
                            <Form>
                                <Form.Group>
                                    <Form.Label>
                                        Введіть назву типу товару:
                                    </Form.Label>
                                    <Form.Control onChange={onChangeAddNameRole} value={roleModel.name} type="text" placeholder="Адмін..." />
                                </Form.Group>
                            </Form>
                        </div>
                        <div>
                            <Button onClick={addRole}>Створити</Button>
                        </div>
                    </div>
                </div>
                :
                <div className="alert__wrapper" >
                    <Alert key="warning" variant="warning">
                        List of roles is empty!
                    </Alert>

                    <div className="role__form-wrapper">
                        <div className="role__title-wrapper">
                            <label className="role__title">Створити роль</label>
                        </div>
                        <div className="role__form">
                            <Form>
                                <Form.Group>
                                    <Form.Label>
                                        Введіть роль:
                                    </Form.Label>
                                    <Form.Control onChange={onChangeAddNameRole} value={roleModel.name} type="text" placeholder="Адмін..." />
                                </Form.Group>
                            </Form>
                        </div>
                        <div>
                            <Button onClick={addRole}>Створити</Button>
                        </div>
                    </div>
                </div>

            }
        </div >
    );
};

export default Role;