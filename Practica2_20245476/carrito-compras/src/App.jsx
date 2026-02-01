// import React from 'react'

import { useState, useEffect} from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Guitar } from "./components/Guitar";
import { db } from "./data/db";

export const App = () => {

    function initialCart(){
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    const [data, setData] = useState(db);
    const [cart, setCart] = useState(initialCart);
    useEffect(() => {// se ejeecuta cada vez que cambie la variable de estado cart, se encarga de gestionar los efectos secundarios
    // de un cambio en la variable de estado que se defina como segundo parámetro [cart]
        localStorage.setItem('cart', JSON.stringify(cart));
    },[cart]); 

    // function handleClick(guitar) {
    //     //alert(`Has hecho click sobre la guitarra ${guitar.name}`);
    //     setCart((prevCart) => [...prevCart, guitar]);
    // }  
    function addToCart(guitar) {
        const itemIndex = cart.findIndex((item) => guitar.id === item.id); // se recibe el index y devuelve si el id de la guitarra agrenado
         // coincide con el de la que se está iterando
        console.log(itemIndex);
        if(itemIndex === -1){ // Ese artículo aún no existe en el carrito
            guitar.quantity = 1
            setCart([...cart, guitar]);
        }
        else{ // si la guitarra ya se había añadido al carrito
            const updatedGuitar = [...cart] // creando una copia de la variable de estado
            updatedGuitar[itemIndex].quantity ++; // incrementando la cantidad
            setCart(updatedGuitar); // actualizando el estado del carrito
        }
        // saveCartToLocalStorage(); // cada vez que se hace una actualización, llama a la función para guardar el carrito
    }

    // EJERCICIO GUÍA 2 - función para incrementar la cantidad
    function increaseQuantity(id){
        const updatedCart = cart.map(item => {
            if(item.id === id){
                return {...item, quantity: item.quantity + 1};
            }
            return item;
        })
        setCart(updatedCart);
    }

    // EJERCICIO GUÍA 2 - función para decrementar la cantidad
    function decreaseQuantity(id){
        const updatedCart = cart.map(item => (item.id === id && item.quantity > 1) ? ({...item, quantity: item.quantity - 1}) : item
        );
        setCart(updatedCart);
    }

    // EJERCICIO GUÍA 2 - función para eliminar un ítem del carrito
    function removeFromCart(id){
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
    }

    // EJERCICIO GUÍA 2 - función para vaciar el carrito
    function clearCart(){
        setCart([]);
    }

    function calculateTotal(){
        // let total = 0;
        // for (const guitar of cart) {
        //     total += guitar.price * guitar.quantity;
        // }
        let total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        return total;
    }

    // function saveCartToLocalStorage(){ // no recibe parámetros, sino que toma la variable de estado cart definida arriba
    //     localStorage.setItem('cart', JSON.stringify(cart)); // objeto/varible de estado cart se convierte a JSON y esa string se guarda en el
    //     // localStorage en una variable/key llamada 'cart'
    // }
    
    return (
        <>
            <Header cart={cart} total={calculateTotal()} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart}
             clearCart={clearCart}/> 
             {/* pasando la prop cart al Header, que es el useState */}
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {/* <Guitar name="Guitarra 1" price={100}/>
                    <Guitar name="Guitarra 2" price={200}/>
                    <Guitar name="Guitarra 3" price={300}/> */}
                    {data.map((guitar) => (
                        <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart}/> // propiedad setCart con valor setCart y sin cart={cart}
                    ))}
                </div>
            </main>
            <Footer />
        </>
    )
}