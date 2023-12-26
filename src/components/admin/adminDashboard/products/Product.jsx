import React, { useEffect, useState } from "react";
import './Product.css';
import { Button, Form } from 'react-bootstrap';
// import { ProductModel } from '../../../../models/productModel';
import chikenShaurma from '../../../../images/chiken-shaurma.jpg';
import { getAllListProducts } from "../../../../services/product.service";
import { getListTypeProducts } from "../../../../services/typeProduct.service";
import { getListMeasurements } from "../../../../services/measurement.service";
import { ProductModel } from "../../../../models/productModel";

const Product = () => {

    const [listProducts, setListProducts] = useState([]);
    const [listTypeProducts, setListTypeProducts] = useState([]);
    const [listMeasurements, setListMeasurements] = useState([]);
    const [productModel, setProductModel] = useState(new ProductModel("", "", "", 0, "", "", 0, 0, ""));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseProducts = await getAllListProducts();
                const responseTypeProducts = await getListTypeProducts();
                const responseMeasurements = await getListMeasurements();

                if (responseProducts.data && responseTypeProducts.data && responseMeasurements.data) {
                    setListProducts(responseProducts.data);
                    setListTypeProducts(responseTypeProducts.data);
                    setListMeasurements(responseMeasurements.data);

                    console.log(listProducts);
                    console.log(listTypeProducts);
                    console.log(listMeasurements);
                }
            }
            catch (ex) {
                console.log("Product.jsx useEffect exception: ", ex)
            }
        }
        fetchData();
    }, []);


    const onChangeProduct = (e, name) => {
        const { value } = e.target;
        setProductModel((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const addProduct = () => {
        if (productModel) {
            console.log(productModel);
        }
    }

    return (
        <div className="product__container">
            <div className="main__text-wrapper">
                <label className="main__text">Сторінка продуктів</label>
            </div>
            <div className="page__content">
                <div className="products__wrapper element-with-scroll">
                    <div className="products">
                        <div className="product">
                            <div className="product__info">
                                <div className="product__type">Шаурма</div>
                                <div className="product__img-wrapper">
                                    <img className="product__image" src={chikenShaurma} alt="" />
                                </div>
                                <div className="product__name">Куряча класична</div>
                                <div className="product__price">
                                    Ціна 120 грн
                                </div>
                                <div className="product__additional-button">Більше</div>
                            </div>
                        </div>
                        <div className="product">
                            <div className="product__info">
                                <div className="product__type">Шаурма</div>
                                <div className="product__img-wrapper">
                                    <img className="product__image" src={chikenShaurma} alt="" />
                                </div>
                                <div className="product__name">Куряча класична</div>
                                <div className="product__price">
                                    Ціна 120 грн
                                </div>
                                <div className="product__additional-button">Більше</div>
                            </div>
                        </div>
                        <div className="product">
                            <div className="product__info">
                                <div className="product__type">Шаурма</div>
                                <div className="product__img-wrapper">
                                    <img className="product__image" src={chikenShaurma} alt="" />
                                </div>
                                <div className="product__name">Куряча класична</div>
                                <div className="product__price">
                                    Ціна 120 грн
                                </div>
                                <div className="product__additional-button">Більше</div>
                            </div>
                        </div>
                        <div className="product">
                            <div className="product__info">
                                <div className="product__type">Шаурма</div>
                                <div className="product__img-wrapper">
                                    <img className="product__image" src={chikenShaurma} alt="" />
                                </div>
                                <div className="product__name">Куряча класична</div>
                                <div className="product__price">
                                    Ціна 120 грн
                                </div>
                                <div className="product__additional-button">Більше</div>
                            </div>
                        </div>
                        <div className="product">
                            <div className="product__info">
                                <div className="product__type">Шаурма</div>
                                <div className="product__img-wrapper">
                                    <img className="product__image" src={chikenShaurma} alt="" />
                                </div>
                                <div className="product__name">Куряча класична</div>
                                <div className="product__price">
                                    Ціна 120 грн
                                </div>
                                <div className="product__additional-button">Більше</div>
                            </div>
                        </div>
                        <div className="product">
                            <div className="product__info">
                                <div className="product__type">Шаурма</div>
                                <div className="product__img-wrapper">
                                    <img className="product__image" src={chikenShaurma} alt="" />
                                </div>
                                <div className="product__name">Куряча класична</div>
                                <div className="product__price">
                                    Ціна 120 грн
                                </div>
                                <div className="product__additional-button">Більше</div>
                            </div>
                        </div>
                        <div className="product">
                            <div className="product__info">
                                <div className="product__type">Шаурма</div>
                                <div className="product__img-wrapper">
                                    <img className="product__image" src={chikenShaurma} alt="" />
                                </div>
                                <div className="product__name">Куряча класична</div>
                                <div className="product__price">
                                    Ціна 120 грн
                                </div>
                                <div className="product__additional-button">Більше</div>
                            </div>
                        </div>
                        <div className="product">
                            <div className="product__info">
                                <div className="product__type">Шаурма</div>
                                <div className="product__img-wrapper">
                                    <img className="product__image" src={chikenShaurma} alt="" />
                                </div>
                                <div className="product__name">Куряча класична</div>
                                <div className="product__price">
                                    Ціна 120 грн
                                </div>
                                <div className="product__additional-button">Більше</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product__add-form">
                    <div className="product__title-wrapper">
                        <label className="product__title">Створити продукт</label>
                    </div>
                    <div className="form__product">
                        <Form>
                            <Form.Group>
                                <Form.Label>
                                    Оберіть тип продукту:
                                </Form.Label>
                            </Form.Group>

                            <select className="product__typeProduct-dropDown"
                                onChange={(e) => onChangeProduct(e, "typeProductId")}
                                name="productModel.typeProductId"
                                value={productModel.typeProductId}>
                                <option>
                                </option>
                                {listTypeProducts.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.typeProductName}
                                    </option>
                                ))}
                            </select>


                            <Form.Group>
                                <Form.Label>
                                    Введіть назву продукту:
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Куряча класична..."
                                    onChange={(e) => onChangeProduct(e, "nameProduct")} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Введіть ціну:
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="100 грн..."
                                    onChange={(e) => onChangeProduct(e, "price")} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Опис:
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ковбаса, сир..."
                                    onChange={(e) => onChangeProduct(e, "description")} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Час приготування, хв:
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="10"
                                    onChange={(e) => onChangeProduct(e, "cookingTime")} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Вага:
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="500"
                                    onChange={(e) => onChangeProduct(e, "volume")} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Об'єм:
                                </Form.Label>
                            </Form.Group>

                            <select className="product__measurement-dropDown"
                                onChange={(e) => onChangeProduct(e, "measurementId")}>
                                <option></option>
                                {listMeasurements.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </Form>

                    </div>
                    <div className="product__adding-button">
                        <Button variant="primary" onClick={addProduct}>Додати</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;