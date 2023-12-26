import React, { useEffect, useState } from "react";
import './TypeProduct.css';
import { TypeProductModel } from "../../../../models/typeProductModel";
import { Alert, Button, Form } from 'react-bootstrap';
import { deleteTypeProduct, getListTypeProducts, createTypeProduct, updateTypeProduct } from "../../../../services/typeProduct.service";

const TypeProduct = () => {

    const [typeProductModel, setTypeProductModel] = useState(new TypeProductModel("", ""));
    const [editedTypeProductValue, setEditTypeProductValue] = useState(new TypeProductModel("", ""));
    const [typeProductList, setTypeProductList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingItemId, setEditingItemId] = useState(null);

    useEffect(() => {
        const getTypeProductsList = async () => {
            try {
                const response = await getListTypeProducts();
                if (response.data) {
                    setTypeProductList(response.data);
                }
            }
            catch (ex) {
                console.log("GetListMeasurements exception: ", ex);
            }
        }
        getTypeProductsList();
    }, [typeProductModel]);


    const onChangeAddNameTypeProduct = (e) => {
        const typeProduct = new TypeProductModel("", e.target.value);
        setTypeProductModel(typeProduct);
    }

    const addTypeProduct = () => {
        const createTypeProductAsync = async () => {
            try {
                const response = await createTypeProduct(typeProductModel);
                if (response.data) {
                    const typeProduct = new TypeProductModel("", "");
                    setTypeProductModel(typeProduct);
                }
            }
            catch (ex) {
                console.log("AddTypeProductException: ", ex);
            }
        }
        createTypeProductAsync();
    }

    const handleDelete = (itemId) => {
        const deleteTypeProductByIdAsync = async () => {
            try {
                const response = await deleteTypeProduct(itemId);
                if (response.data) {
                    setTypeProductList((prevList) =>
                        prevList.filter((item) => item.id !== itemId)
                    );
                }
            } catch (error) {
                console.error('Error deleting type product', error);
            }
        }
        deleteTypeProductByIdAsync();
    };

    const showEditPanel = (itemId) => {
        setIsEditing(!isEditing);
        setEditingItemId(itemId);
    }

    const onChangeEditTypeProductValue = (e) => {
        const editedTypeProductValue = new TypeProductModel("", e.target.value);
        setEditTypeProductValue(editedTypeProductValue);
    }

    const saveEditedTypeProduct = (itemId) => {
        const typeProduct = typeProductList.find(item => item.id === itemId);
        typeProduct.typeProductName = editedTypeProductValue.name;

        const updateTypeProductAsync = async () => {
            try {
                const response = await updateTypeProduct(typeProduct);
                if (response.data) {
                    const typeProduct = new TypeProductModel(response.data.id, response.data.typeProductName);
                    setTypeProductModel(typeProduct);

                    setIsEditing(!isEditing);
                    setEditingItemId(null);
                }
            }
            catch (ex) {
                console.log("SaveEditedTypeProduct exception: ", ex);
            }
        }

        updateTypeProductAsync();
    }

    return (
        <div className="typeProduct__container">
            <div className="main__text-wrapper">
                <label className="main__text">Сторінка типу продукта</label>
            </div>

            {typeProductList.length > 0 ?
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
                                    {typeProductList.map((item) => {
                                        const isEditingItem = isEditing && editingItemId === item.id;

                                        return (
                                            <tr key={item.id}>
                                                {isEditingItem ? (
                                                    <React.Fragment key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>
                                                            <Form>
                                                                <Form.Group>
                                                                    <Form.Control onChange={onChangeEditTypeProductValue} defaultValue={item.typeProductName} type="text" />
                                                                </Form.Group>
                                                            </Form>
                                                        </td>
                                                        <td>
                                                            <Button variant="success" onClick={() => saveEditedTypeProduct(item.id)}>
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
                                                        <td>{item.typeProductName}</td>
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
                    <div className="typeProduct__form-wrapper">
                        <div className="typeProduct__title-wrapper">
                            <label className="typeProduct__title">Створити тип товару</label>
                        </div>
                        <div className="typeProduct__form">
                            <Form>
                                <Form.Group>
                                    <Form.Label>
                                        Введіть назву типу товару:
                                    </Form.Label>
                                    <Form.Control onChange={onChangeAddNameTypeProduct} value={typeProductModel.name} type="text" placeholder="Шаурма..." />
                                </Form.Group>
                            </Form>
                        </div>
                        <div>
                            <Button onClick={addTypeProduct}>Створити</Button>
                        </div>
                    </div>
                </div>
                :
                <div className="alert__wrapper" >
                    <Alert key="warning" variant="warning">
                        List of type products is empty!
                    </Alert>

                    <div className="typeProduct__form-wrapper">
                        <div className="typeProduct__title-wrapper">
                            <label className="typeProduct__title">Створити тип товару</label>
                        </div>
                        <div className="typeProduct__form">
                            <Form>
                                <Form.Group>
                                    <Form.Label>
                                        Введіть назву типу товару:
                                    </Form.Label>
                                    <Form.Control onChange={onChangeAddNameTypeProduct} value={typeProductModel.name} type="text" placeholder="Шаурма..." />
                                </Form.Group>
                            </Form>
                        </div>
                        <div>
                            <Button onClick={addTypeProduct}>Створити</Button>
                        </div>
                    </div>
                </div>

            }
        </div >
    );
};

export default TypeProduct;