import React, { useEffect, useState } from "react";
import './Measurement.css';
import { Alert, Button, Form } from 'react-bootstrap';
import { MeasurementModel } from "../../../../models/measurementModel";
import { deleteMeasurement, getListMeasurements, createMeasurement, updateMeasurement } from "../../../../services/measurement.service";


const Measurement = () => {

    const [measurementModel, setMeasurementModel] = useState(new MeasurementModel("", ""));
    const [editedMeasurementValue, setEditedMeasurementValue] = useState(new MeasurementModel("", ""));
    const [measurementList, setMeasurementList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingItemId, setEditingItemId] = useState(null);

    useEffect(() => {
        const getMeasurementsList = async () => {
            try {
                const response = await getListMeasurements();
                if (response.data) {
                    setMeasurementList(response.data);
                }
            }
            catch (ex) {
                console.log("GetListMeasurements exception: ", ex);
            }
        }
        getMeasurementsList();
    }, [measurementModel]);


    const onChangeAddNameMeasurement = (e) => {
        const measurement = new MeasurementModel("", e.target.value);
        setMeasurementModel(measurement);
    }

    const addMeasurement = () => {
        if (measurementModel) {
            createMeasurement(measurementModel).then(() => {
                const measurement = new MeasurementModel("", "");
                setMeasurementModel(measurement);
            });
        }
        else {
            alert("Поле не може бути порожнім!");
        }
    }

    const handleDelete = async (itemId) => {
        try {
            const response = await deleteMeasurement(itemId);
            if (response.data) {
                setMeasurementList((prevList) =>
                    prevList.filter((item) => item.id !== itemId)
                );
            }
        } catch (error) {
            console.error('Error deleting measurement', error);
        }
    };

    const showEditPanel = (itemId) => {
        setIsEditing(!isEditing);
        setEditingItemId(itemId);
    }

    const onChangeEditMeasurementValue = (e) => {
        const editedMeasurementValue = new MeasurementModel("", e.target.value);
        setEditedMeasurementValue(editedMeasurementValue);
    }

    const saveEditedMeasurement = (itemId) => {
        const measurement = measurementList.find(item => item.id === itemId);
        measurement.name = editedMeasurementValue.name;

        const updateMeasurementAsync = async () => {
            try {
                const response = await updateMeasurement(measurement);
                if (response.data) {
                    const measurement = new MeasurementModel(response.data.id, response.data.name);
                    setMeasurementModel(measurement);
                
                    setIsEditing(!isEditing);
                    setEditingItemId(null);
                }
            }
            catch (ex) {
                console.log("SaveEditedMeasurement exception: ", ex);
            }
        }

        updateMeasurementAsync();
    }

    return (
        <div className="measurement__container">
            <div className="main__text-wrapper">
                <label className="main__text">Сторінка міри виміру</label>
            </div>

            {measurementList.length > 0 ?
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
                                    {measurementList.map((item) => {
                                        const isEditingItem = isEditing && editingItemId === item.id;

                                        return (
                                            <tr key={item.id}>
                                                {isEditingItem ? (
                                                    <React.Fragment key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>
                                                            <Form>
                                                                <Form.Group>
                                                                    <Form.Control onChange={onChangeEditMeasurementValue} defaultValue={item.name} type="text" />
                                                                </Form.Group>
                                                            </Form>
                                                        </td>
                                                        <td>
                                                            <Button variant="success" onClick={() => saveEditedMeasurement(item.id)}>
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
                    <div className="measurement__form-wrapper">
                        <div className="measurement__title-wrapper">
                            <label className="measurement__title">Створити міру</label>
                        </div>
                        <div className="measurement__form">
                            <Form>
                                <Form.Group>
                                    <Form.Label>
                                        Введіть назву міри:
                                    </Form.Label>
                                    <Form.Control onChange={onChangeAddNameMeasurement} value={measurementModel.name} type="text" placeholder="Кг..." />
                                </Form.Group>
                            </Form>
                        </div>
                        <div>
                            <Button onClick={addMeasurement}>Створити</Button>
                        </div>
                    </div>
                </div>
                :
                <div className="alert__wrapper" >
                    <Alert key="warning" variant="warning">
                        List of measurements is empty!
                    </Alert>

                    <div className="measurement__form-wrapper">
                        <div className="measurement__title-wrapper">
                            <label className="measurement__title">Створити міру</label>
                        </div>
                        <div className="measurement__form">
                            <Form>
                                <Form.Group>
                                    <Form.Label>
                                        Введіть назву міри:
                                    </Form.Label>
                                    <Form.Control onChange={onChangeAddNameMeasurement} value={measurementModel.name} type="text" placeholder="Кг..." />
                                </Form.Group>
                            </Form>
                        </div>
                        <div>
                            <Button onClick={addMeasurement}>Створити</Button>
                        </div>
                    </div>
                </div>

            }
        </div>
    );
};

export default Measurement;