import React from 'react';
import Header from "../ToDo/Header.tsx";
import UserItem from "./UserItem.tsx";

const Admin = () => {
    return (
        <div>
            <Header></Header>
            <UserItem id = {'12'}></UserItem>
            
        </div>
    );
};

export default Admin;