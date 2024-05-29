
import { CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreateBookForm from "./components/CreateBookForm";
import BookTable from "./components/BookTable";
import OrdersTable from "./components/OrdersTable";
import UserTable from "./components/UserTable";
import AdminDashboard from "./components/Dashboard";
import AuthorTable from "./components/AuthorTable";
import CategoryTable from "./components/CategoryTable";
import PublisherTable from "./components/PublisherTable";
import CreateAuthorForm from "./components/CreateAuthorForm";
import CreateCategoryForm from "./components/CreateCategoryForm";
import CreatePublisherForm from "./components/CreatePublisherForm";
import CreateBookItemForm from "./components/CreateBookItemForm";

const menu = [
  { name: "Home", path: "/", icon: <DashboardIcon/>},
  { name: "Accounts", path: "/admin/accounts", icon: <DashboardIcon/>},
  { name: "Books", path: "/admin/books", icon: <DashboardIcon/>},
  { name: "Authors", path: "/admin/authors", icon: <DashboardIcon/> },
  { name: "Categories", path: "/admin/categories", icon: <DashboardIcon/> },
  { name: "Publishers", path: "/admin/publishers", icon: <DashboardIcon/> },
  { name: "Orders", path: "/admin/orders", icon: <DashboardIcon/> },
];

const Admin = () => {
  const them = useTheme();
  const isLargeScreen = useMediaQuery(them.breakpoints.up("lg"));
  const [sideBarVisible, setSidaBarVisible] = useState(false);
  const navigate = useNavigate();

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height:"100%"
      }}>
        <>
            {/* {isLargeScreen && <Toolbar/>} */}
            <List>
                {menu.map((item, index) => (
                    <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)}>
                        <ListItemButton>
                            <ListItemButton>
                                {item.icon}
                            </ListItemButton>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItemButton>
                        
                    </ListItem>
                ))}
            </List>
        </>

        <List>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemButton>
                        <AccountCircleIcon/>
                        <ListItemText>Account</ListItemText>
                    </ListItemButton>
                </ListItemButton>
                
            </ListItem>
        </List>
    </Box>
  );
  return (
    <div>
        <div className="flex h-[100vh]">
            <CssBaseline/>
            <div className="w-[15%] border border-r-gray-300 h-full">
                {drawer}
            </div>
            <div className="w-[85%]">
                <Routes>
                    <Route path="/" element={<AdminDashboard/>}></Route>
                    <Route path="/book/create" element={<CreateBookForm/>}></Route>
                    <Route path="/book/create/:id" element={<CreateBookForm/>}></Route>
                    <Route path="/books" element={<BookTable/>}></Route>
                    <Route path="/book/addquantity" element={<CreateBookItemForm/>}></Route>
                    <Route path="/book/deletequantity/:id" element={<CreateBookItemForm/>}></Route>
                    <Route path="/orders" element={<OrdersTable/>}></Route>
                    <Route path="/accounts" element={<UserTable/>}></Route>
                    <Route path="/authors" element={<AuthorTable/>}></Route>
                    <Route path="/author/create" element={<CreateAuthorForm/>}></Route>
                    <Route path="/categories" element={<CategoryTable/>}></Route>
                    <Route path="/category/create" element={<CreateCategoryForm/>}></Route>
                    <Route path="/publishers" element={<PublisherTable/>}></Route>
                    <Route path="/publisher/create" element={<CreatePublisherForm/>}></Route>
                </Routes>
            </div>
        </div>
    </div>
    )
};

export default Admin;
