import { Accordion, AccordionDetails, Box, Button, Card, Divider, Grid, List, ListItem, ListItemText, Pagination, Skeleton, Slider, TablePagination, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import ProductCard from "../../../Components/productCard";
import StickyBox from "react-sticky-box";
import * as ProductServices from "../../../../Services/ProductServices"
import * as CollectionServices from "../../../../Services/CollectionServices"
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TuneIcon from '@mui/icons-material/Tune';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Overlay from "../../../Components/overlay";
import { Collapse, ListItemButton, ListItemIcon } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { formatPrice } from "../../../../Ults";
const theme = createTheme({
    typography: {
        fontFamily: 'Roboto', // Thay 'Your-Font-Family' bằng font bạn muốn sử dụng
    },
})

export default function ProductsContent() {
    const navigate = useNavigate();
    const location = useLocation();
    let { collectionId } = useParams();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search');
    const [products, setProducts] = useState(null);
    const [isShowPowers, setIsShowPowers] = useState(10)
    const [isShowTypes, setIsShowTypes] = useState(6)
    const [open, setOpen] = useState(false);
    const [openPower, setOpenPower] = useState(false);
    const [openColor, setOpenColor] = useState(false);
    const [filterByPrice, setFilterByPrice] = useState(false)
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [isOpenSort, setOpenSort] = useState(false)
    const [isOpenFilter, setOpenFilter] = useState(false)
    const [selectedPower, setSelectedPower] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const handleToggleSort = () => {
        setOpenSort(!isOpenSort)
    }
    const [filterS, setFilterS] = useState(12);
    const [filterL, setFilterL] = useState(12);
    const [itemRowDisplay, setItemRowDisplay] = useState(3);
    const [filters, setFilters] = useState({
        type: '',
        power: '',
        color: '',
        minPrice: '',
        maxPrice: '',
    });

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(14);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const [sort, setSort] = useState(null);
    const getAllProducts = async () => {
        const res = await ProductServices.GetAllProduct(searchQuery, collectionId, filters.type, filters.minPrice, filters.maxPrice, filters.power, filters.color, sort, page, rowsPerPage);
        return res;
    }

    const { isLoading, data } = useQuery(['products', searchQuery, page, rowsPerPage, collectionId, filters.type, filters.minPrice, filters.color, filters.maxPrice, filters.power, sort], getAllProducts, {
        enabled: !!collectionId || !!searchQuery || !!filters.type || !!filters.minPrice || !!filters.color || !!filters.maxPrice || !!filters.power || !!sort,
        onSuccess: (responseData) => {
            if (responseData) {
                setProducts(responseData.data);
            }
        },
    });


    const getProductRefProps = async () => {
        const res = await ProductServices.GetProductRefProps();
        return res;
    }
    const { isLoading: isLoadingRef, data: refData } = useQuery({ queryKey: ['product-ref'], queryFn: getProductRefProps })

    const getAllProductType = async () => {
        const res = await ProductServices.getAllProductType();
        return res;
    }

    const { isLoading: isLoadingType, data: typeData } = useQuery({ queryKey: ['product-types'], queryFn: getAllProductType })

    const getOneCollection = async (id) => {
        if (id !== 0 && id !== "0" && id !== undefined) {
            const res = await CollectionServices.GetCollection(id);
            return res;
        }
        return {};
    }

    const handleFilterClick = (filterName, value) => {
        const queryParams = new URLSearchParams();
        if (filterName == "power") {
            setSelectedPower(value);
            setOpenPower(!openPower);
        } else if (filterName == "color") {
            setSelectedColor(value);
            setOpenColor(!openColor);
        } else if (filterName == "type") {
            setSelectedType(value);
            setOpen(!open);
        }
        setFilters({ ...filters, [filterName]: value });

        for (const key in filters) {
            if (filters[key] && key != filterName) {
                queryParams.append(key, filters[key]);
            }
        }
        queryParams.delete("sort");
        setSort(null)
        queryParams.append(filterName, value);
        navigate(`/products${collectionId !== 0 && collectionId ? "/" + collectionId : "/0"}?${queryParams.toString()}`);
    };

    const handleSort = (sortBy) => {
        handleToggleSort()
        const queryParams = new URLSearchParams();
        queryParams.delete("color")
        queryParams.delete("power")
        queryParams.delete("type")
        queryParams.delete("minPrice")
        queryParams.delete("maxPrice")
        setSort(sortBy)
        queryParams.append("sort", sortBy);
        navigate(`/products${collectionId !== 0 && collectionId ? "/" + collectionId : "/0"}?${queryParams.toString()}`);
    }

    const filterProducts = () => {
        if (filters) {
            const queryParams = new URLSearchParams();
            setFilterByPrice(true)
            if (minPrice && maxPrice) {
                setFilters({ ...filters, minPrice: minPrice, maxPrice: maxPrice })
            }

            for (const key in filters) {
                if (filters[key]) {
                    queryParams.append(key, filters[key]);
                }
            }
            queryParams.delete("sort");
            navigate(`/products${collectionId !== 0 && collectionId ? "/" + collectionId : "/0"}?${queryParams.toString()}`);
        }
    };


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const newFilters = {};

        for (const key of params.keys()) {
            if (params.get(key))
                newFilters[key] = params.get(key);
        }
        const { minPrice, maxPrice, ...rest } = newFilters
        if (filterByPrice && minPrice && maxPrice) {
            setFilters(newFilters)
        } else {
            setFilters(rest);
        }

        if (queryParams.get("sort")) {
            setSort(queryParams.get("sort"))
        }

    }, [location.search]);

    var count = 0;
    var countQ = 6;

    const handleToggleFilter = () => {
        setOpenFilter(!isOpenFilter)
        if (filterS !== 3) {
            setFilterS(3)
        } else {
            setFilterS(12)
        }
        if (filterL !== 9) {
            setFilterL(9)
        } else {
            setFilterL(12)
        }
        if (itemRowDisplay === 4) {
            setItemRowDisplay(3)
        } else {
            setItemRowDisplay(4)
        }
    }
    const handleClick = (field) => {
        if (field === "categories")
            setOpen(!open);
        else if (field === "powers")
            setOpenPower(!openPower);
        else if (field === "colors")
            setOpenColor(!openColor);
    };
    const handleRemoveFilter = (filterName) => {
        if (filterName == "color") {
            setSelectedColor("");
        }
        else if (filterName == "power") {
            setSelectedPower("");
        }
        else if (filterName == "type") {
            setSelectedType("");
        }
        else if (filterName == "minPrice") {
            setMinPrice("");
        }
        else if (filterName == "maxPrice") {
            setMinPrice("");
        }
        setFilters(prevFilters => {
            const updatedFilters = { ...prevFilters, [filterName]: '' };
            const newQueryParams = new URLSearchParams(location.search);
            newQueryParams.delete(filterName);
            navigate(`/products${collectionId !== 0 && collectionId ? "/" + collectionId : "/0"}?${newQueryParams.toString()}`);
            return updatedFilters;
        });
    };
    const handleRemoveAllFilters = () => {
        setFilters({});
        setSelectedColor("");
        setSelectedPower("");
        setSelectedType("");
        setMinPrice("");
        setMinPrice("");
        navigate(`/products/0?`);
    };
    return (
        <>


            <ThemeProvider theme={theme}>
                <Box sx={{
                    marginTop: {
                        xs: "160px",
                        sm: "160px",
                        md: "45px",
                        lg: "50px",
                    },
                    background: "#ffffff",
                    position: "relative",
                    zIndex: "80"
                }}>

                    <Box sx={{
                    }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", padding: "50px 20px", paddingBottom: "20px" }}>
                            <div className="l"><Typography variant="body1" sx={{ color: "#313131", fontWeight: "bold" }}>Sản phẩm</Typography></div>
                            <div className="r" style={{ display: 'flex', gap: '30px' }}>
                                <button onClick={handleToggleFilter} style={{ border: "none", backgroundColor: "unset", fontSize: "1.5rem", cursor: "pointer", display: 'flex', gap: '5px', alignItems: 'center', color: 'black' }}><Typography variant="body1">Bộ lọc</Typography> <span style={{ fontSize: "6px" }}><TuneIcon /></span></button>
                                <div className="dropdown" style={{ position: 'relative' }}>
                                    <button onClick={handleToggleSort} style={{ border: "none", backgroundColor: "unset", fontSize: "1.5rem", cursor: "pointer", display: 'flex', gap: '5px', alignItems: 'center', color: 'black' }}>
                                        <div><Typography variant="body1">Sắp xếp</Typography></div>
                                        <div style={isOpenSort === false ? { rotate: "0deg" } : { rotate: "180deg" }}>
                                            <KeyboardArrowDownIcon />
                                        </div>
                                    </button>
                                    <Box position="absolute" style={isOpenSort === true ? { display: "block" } : { display: 'none' }} sx={{ top: "40px", zIndex: "100", borderRadius: "5px", background: "white", width: "133px", fontSize: "1rem" }}>
                                        <div onClick={() => handleSort("min_price")} style={{ padding: '5px 15px', cursor: "pointer" }}><Typography style={{ fontSize: ".8rem" }} variant="h6">Giá tiền thấp</Typography></div>
                                        <div onClick={() => handleSort("max_price")} style={{ padding: '5px 15px', cursor: "pointer" }}><Typography style={{ fontSize: ".8rem" }} variant="h6">Giá tiền cao</Typography></div>
                                    </Box>
                                </div>
                                {
                                    isOpenSort === true
                                        ?
                                        <Overlay func={handleToggleSort} />
                                        : ""
                                }
                            </div>
                        </Box>
                        {/* mobile filter */}
                        <Box sx={{
                            display: {
                                xs: 'block',
                                md: 'none'
                            }
                        }}>
                            {(isOpenFilter === true) ? <Overlay func={handleToggleFilter} /> : ""}
                            <Box sx={{ marginTop: '60px', objectFit: 'cover', overflowY: 'auto', maxHeight: "calc(100vh - 60px)", zIndex: "200" }} className={`filter-sidebar ${(isOpenFilter === true) ? 'filter-active' : ''}`}>
                                <div className="btn-close" onClick={handleToggleFilter}><CloseIcon /></div>
                                <div className="filter-by-lighting-type">
                                    <ListItemButton onClick={() => handleClick("categories")}>
                                        <ListItemIcon>
                                            Danh mục sản phẩm
                                        </ListItemIcon>
                                        <ListItemText primary="" />
                                        {open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {typeData?.data?.map((item, index) => {
                                                return <>
                                                    <ListItemButton sx={{
                                                        pl: 4,
                                                        backgroundColor: selectedType === item._id ? 'black' : 'white',
                                                        color: selectedType === item._id ? 'white' : 'black',
                                                    }} onClick={() =>
                                                        handleFilterClick("type", item?._id)
                                                    }>
                                                        <ListItemText primary={item?.typeName} />
                                                    </ListItemButton>
                                                </>
                                            })}
                                        </List>
                                    </Collapse>
                                </div>
                                {/* *&^ */}
                                <div>
                                    <ListItemButton onClick={() => handleClick("powers")}>
                                        <ListItemIcon>
                                            Công xuất
                                        </ListItemIcon>
                                        <ListItemText primary="" />
                                        {openPower ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={openPower} timeout="auto" unmountOnExit>
                                        <List component="div" sx={{
                                            display: 'flex', gap: '5px', flexWrap: 'wrap',
                                        }} disablePadding>
                                            {
                                                refData?.data?.powers ?
                                                    <>
                                                        {
                                                            refData?.data?.powers?.map((item, index) => {
                                                                return <ListItemButton
                                                                    key={index}
                                                                    onClick={() => handleFilterClick("power", item._id)}
                                                                    sx={{
                                                                        padding: '3px',
                                                                        border: '1px solid #cacaca',
                                                                        cursor: 'pointer',
                                                                        borderRadius: '2px',
                                                                        backgroundColor: selectedPower === item._id ? 'black' : 'white',
                                                                        color: selectedPower === item._id ? 'white' : 'black',
                                                                    }}
                                                                >
                                                                    <Typography>{item.powerValue}</Typography>
                                                                </ListItemButton>
                                                            })
                                                        }
                                                    </>
                                                    : ""
                                            }
                                        </List>
                                    </Collapse>
                                </div>
                                <div>
                                    <ListItemButton onClick={() => handleClick("colors")}>
                                        <ListItemIcon>
                                            Màu sắc ánh sáng
                                        </ListItemIcon>
                                        <ListItemText primary="" />
                                        {openColor ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={openColor} timeout="auto" unmountOnExit>
                                        <List sx={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }} component="div" disablePadding>
                                            {
                                                refData?.data?.colors ?
                                                    <>
                                                        {
                                                            refData?.data?.colors?.map((item, index) => {
                                                                return (
                                                                    <ListItemButton
                                                                        key={index}
                                                                        onClick={() => handleFilterClick("color", item?._id)}
                                                                        sx={{
                                                                            padding: '3px',
                                                                            border: '1px solid #cacaca',
                                                                            cursor: 'pointer',
                                                                            borderRadius: '2px',
                                                                            backgroundColor: selectedColor === item._id ? 'black' : 'white',
                                                                            color: selectedColor === item._id ? 'white' : 'black',
                                                                        }}
                                                                    >
                                                                        <Typography>{item.colorName}</Typography>
                                                                    </ListItemButton>
                                                                )
                                                            })
                                                        }
                                                    </>
                                                    : ""
                                            }
                                        </List>
                                    </Collapse>
                                </div>
                                <hr style={{ margin: "10px 0" }} />
                                <Typography component='div' variant="h5" >Giá tiền</Typography>
                                <div>
                                    <TextField
                                        label="Thấp nhất"
                                        type="number"
                                        component="div"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        variant="outlined"
                                        margin="normal"
                                        InputProps={{
                                            inputProps: {
                                                step: 50000, // Đặt bước nhảy khi tăng giảm giá trị (nếu cần)
                                                style: { appearance: 'textfield' }, // Ẩn các nút tăng giảm giá trị (spinner)
                                                min: 0,
                                                max: maxPrice
                                            },
                                        }}
                                        sx={{ width: "100%", marginBottom: "10px" }}
                                    />
                                    <TextField
                                        label="Cao nhất"
                                        type="number"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        variant="outlined"
                                        margin="normal"
                                        InputProps={{
                                            inputProps: {
                                                step: 50000, // Đặt bước nhảy khi tăng giảm giá trị (nếu cần)
                                                style: { appearance: 'textfield' }, // Ẩn các nút tăng giảm giá trị (spinner)
                                                min: minPrice,
                                                max: 10000000000
                                            },
                                        }}
                                        sx={{ width: "100%" }}
                                    />
                                    <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: "100px" }}>
                                        <Button variant="contained" sx={{
                                            background: "white", color: "black", "&:hover": {
                                                background: "black",
                                                color: "white"
                                            }
                                        }} onClick={filterProducts}>
                                            Áp dụng
                                        </Button>
                                        <Button variant="contained" sx={{
                                            background: "black", color: "white", "&:hover": {
                                                background: "black",
                                                color: "white"
                                            }
                                        }} onClick={handleToggleFilter}>
                                            Lọc
                                        </Button>
                                    </div>
                                </div>
                            </Box>

                        </Box>
                        <Box>
                            <Grid container sx={{ position: 'relative', }}>
                                {
                                    isOpenFilter === true ?
                                        <Grid item xs={12} sm={12} md={filterS} lg={filterS} xl={filterS} sx={{
                                            display: {
                                                xs: 'none',
                                                md: 'block'
                                            },
                                            bgColor: "#F7F7F7 !important"
                                        }}>
                                            <StickyBox offsetTop={80} offsetBottom={20} sx={{ bgColor: "#F7F7F7 !important" }}>
                                                <Accordion sx={{ boxShadow: 'none', marginTop: '7px', bgColor: "#F7F7F7 !important" }} className="product-menu">
                                                    <AccordionDetails>
                                                        <Typography component='div' variant="h5" sx={{ marginBottom: '25px', bgColor: "#F7F7F7 !important" }} >Danh Mục Sản Phẩm</Typography>
                                                        {typeData?.data.map((item, index) => {
                                                            if (index < isShowTypes) {
                                                                return (
                                                                    <Box className="menu-item" key={item._id}
                                                                        sx={{
                                                                            backgroundColor: selectedType === item._id ? 'black' : 'white',
                                                                            color: selectedType === item._id ? 'white' : 'black',
                                                                        }}
                                                                        onClick={() => handleFilterClick("type", item?._id)}>
                                                                        <Typography>{item.typeName}</Typography>
                                                                    </Box>
                                                                )
                                                            }
                                                        })}
                                                        {
                                                            typeData?.data?.length >= isShowTypes ?
                                                                <>
                                                                    <br />
                                                                    <div onClick={() => setIsShowTypes(2000)} style={{ cursor: 'pointer', color: 'gray', fontSize: '.8rem' }}>Xem thêm</div>
                                                                    <br />
                                                                </>
                                                                : <br />
                                                        }
                                                        <br />
                                                        <Typography component='div' variant="h5" >Công suất</Typography>
                                                        <br />
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                                            {
                                                                refData?.data?.powers ?
                                                                    <>
                                                                        {
                                                                            refData?.data?.powers?.map((item, index) => {
                                                                                if (index < isShowPowers) {
                                                                                    return <Box onClick={() => handleFilterClick("power", item?._id)} key={index} sx={{
                                                                                        padding: '3px', border: '1px solid #cacaca', cursor: 'pointer', borderRadius: '2px', "&:hover": { background: 'black', color: 'white', transition: '.5s' },
                                                                                        backgroundColor: selectedPower === item._id ? 'black' : 'white',
                                                                                        color: selectedPower === item._id ? 'white' : 'black',
                                                                                    }}><Typography >{item.powerValue}</Typography></Box>
                                                                                }
                                                                            })
                                                                        }
                                                                    </>
                                                                    : ""
                                                            }
                                                        </div>
                                                        {
                                                            refData?.data?.powers.length >= isShowPowers ?
                                                                <>
                                                                    <br />
                                                                    <div onClick={() => setIsShowPowers(2000)} style={{ cursor: 'pointer', color: 'gray', fontSize: '.8rem' }}>Xem thêm</div>
                                                                    <br />
                                                                </>
                                                                : <br />
                                                        }

                                                        <Typography component='div' variant="h5" >Màu sắc ánh sáng</Typography>
                                                        <br />
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                                            {
                                                                refData?.data?.colors ?
                                                                    <>
                                                                        {
                                                                            refData?.data?.colors?.map((item, index) => {
                                                                                if (index < isShowPowers) {
                                                                                    return <Box key={index} onClick={() => handleFilterClick("color", item?._id)} sx={{
                                                                                        padding: '3px', border: '1px solid #cacaca', cursor: 'pointer', borderRadius: '2px', "&:hover": { background: 'black', color: 'white', transition: '.5s' },
                                                                                        backgroundColor: selectedColor === item._id ? 'black' : 'white',
                                                                                        color: selectedColor === item._id ? 'white' : 'black',
                                                                                    }}> <Typography >{item.colorName}</Typography></Box>
                                                                                }
                                                                            })
                                                                        }
                                                                    </>
                                                                    : ""
                                                            }
                                                        </div>
                                                        <br />

                                                        <Typography component='div' variant="h5" >Giá tiền</Typography>
                                                        <div>
                                                            <TextField
                                                                label="Thấp nhất"
                                                                type="number"
                                                                component="div"
                                                                value={minPrice}
                                                                onChange={(e) => setMinPrice(e.target.value)}
                                                                variant="outlined"
                                                                margin="normal"
                                                                InputProps={{
                                                                    inputProps: {
                                                                        step: 50000, // Đặt bước nhảy khi tăng giảm giá trị (nếu cần)
                                                                        style: { appearance: 'textfield' }, // Ẩn các nút tăng giảm giá trị (spinner)
                                                                        min: 0,
                                                                        max: maxPrice
                                                                    },
                                                                }}
                                                                sx={{ width: "100%", marginBottom: "10px" }}
                                                            />
                                                            <TextField
                                                                label="Cao nhất"
                                                                type="number"
                                                                value={maxPrice}
                                                                onChange={(e) => setMaxPrice(e.target.value)}
                                                                variant="outlined"
                                                                margin="normal"
                                                                InputProps={{
                                                                    inputProps: {
                                                                        step: 50000, // Đặt bước nhảy khi tăng giảm giá trị (nếu cần)
                                                                        style: { appearance: 'textfield' }, // Ẩn các nút tăng giảm giá trị (spinner)
                                                                        min: minPrice,
                                                                        max: 10000000000
                                                                    },
                                                                }}
                                                                sx={{ width: "100%" }}
                                                            />
                                                            <Button variant="contained" sx={{
                                                                background: "white", color: "black", "&:hover": {
                                                                    background: "black",
                                                                    color: "white"
                                                                }
                                                            }} onClick={filterProducts}>
                                                                Áp dụng
                                                            </Button>
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </StickyBox>
                                        </Grid>
                                        : ""
                                }

                                <Grid item xs={12} sm={12} md={filterL} lg={filterL} xl={filterL}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '4px 5px', borderRadius: '30px' }}>

                                        {
                                            filters.minPrice && filters.maxPrice ?
                                                <>
                                                    <Box onClick={() => {
                                                        handleRemoveFilter("minPrice")
                                                        handleRemoveFilter("maxPrice")
                                                    }} sx={{ background: 'white', border: '1px solid gray', borderRadius: '20px', padding: '2px 8px', cursor: 'pointer', "&:hover": { background: 'gray', color: 'white', transition: '.2s' } }}>{formatPrice(filters.minPrice)} - {formatPrice(filters.maxPrice)}<span style={{ marginLeft: '10px' }}>&#10006;</span></Box>
                                                </>
                                                : ""
                                        }
                                        {
                                            filters.power !== "" ?
                                                <>
                                                    {
                                                        refData?.data?.powers?.map(item => {
                                                            if (item._id === filters.power) {
                                                                return <Box onClick={() => handleRemoveFilter("power")} sx={{ background: 'white', border: '1px solid gray', borderRadius: '20px', cursor: 'pointer', padding: '2px 8px', "&:hover": { background: 'gray', color: 'white', transition: '.2s' } }}>{item.powerValue}<span style={{ marginLeft: '10px' }}>&#10006;</span></Box>
                                                            }
                                                        })
                                                    }
                                                </>
                                                : ""
                                        }
                                        {
                                            filters.type !== "" ?
                                                <>
                                                    {
                                                        typeData?.data?.map(item => {
                                                            if (item._id === filters.type) {
                                                                return <Box onClick={() => handleRemoveFilter("type")} sx={{ background: 'white', border: '1px solid gray', borderRadius: '20px', cursor: 'pointer', padding: '2px 8px', "&:hover": { background: 'gray', color: 'white', transition: '.2s' } }}>{item.typeName}<span style={{ marginLeft: '10px' }}>&#10006;</span></Box>
                                                            }
                                                        })
                                                    }
                                                </>
                                                : ""
                                        }
                                        {
                                            filters.color !== "" ?
                                                <>
                                                    {
                                                        refData?.data?.colors?.map(item => {
                                                            if (item._id === filters.color) {
                                                                return <Box onClick={() => handleRemoveFilter("color")} sx={{ background: 'white', border: '1px solid gray', borderRadius: '20px', cursor: 'pointer', padding: '2px 8px', "&:hover": { background: 'gray', color: 'white', transition: '.2s' } }}>{item.colorName}<span style={{ marginLeft: '10px' }}>&#10006;</span></Box>
                                                            }
                                                        })
                                                    }
                                                </>
                                                : ""
                                        }
                                        {
                                            (filters.power !== undefined || filters.type !== undefined || filters.color !== undefined || (filters.minPrice !== undefined && filters.maxPrice !== undefined)) ?
                                                <>
                                                    <Box onClick={handleRemoveAllFilters} sx={{ background: 'white', border: '1px solid gray', borderRadius: '20px', padding: '2px 8px', cursor: 'pointer', "&:hover": { background: 'gray', color: 'white', transition: '.2s' } }}><Box sx={{ margin: '0 10px' }}>&#10006;</Box></Box>

                                                </>
                                                : ""
                                        }
                                    </div>
                                    <Grid container sx={{ alignItems: 'center', textAlign: 'center' }}>
                                        {

                                            isLoading === true || products === null ?
                                                <>
                                                    <Grid item xs={12} sm={6} md={itemRowDisplay} lg={itemRowDisplay} xl={itemRowDisplay}>
                                                        <Box sx={{ padding: '10px' }}>
                                                            <Card sx={{ cursor: 'pointer', border: '1px solid #f3f3f3' }} className='card'>

                                                                <Skeleton variant="rectangular" animation="wave" width={"100%"} height={"350px"} />
                                                            </Card >
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={itemRowDisplay} lg={itemRowDisplay} xl={itemRowDisplay}>
                                                        <Box sx={{ padding: '10px' }}>
                                                            <Card sx={{ cursor: 'pointer', border: '1px solid #f3f3f3' }} className='card'>

                                                                <Skeleton variant="rectangular" animation="wave" width={"100%"} height={"350px"} />
                                                            </Card >
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={itemRowDisplay} lg={itemRowDisplay} xl={itemRowDisplay}>
                                                        <Box sx={{ padding: '10px' }}>
                                                            <Card sx={{ cursor: 'pointer', border: '1px solid #f3f3f3' }} className='card'>

                                                                <Skeleton variant="rectangular" animation="wave" width={"100%"} height={"350px"} />
                                                            </Card >
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={itemRowDisplay} lg={itemRowDisplay} xl={itemRowDisplay}>
                                                        <Box sx={{ padding: '10px' }}>
                                                            <Card sx={{ cursor: 'pointer', border: '1px solid #f3f3f3' }} className='card'>

                                                                <Skeleton variant="rectangular" animation="wave" width={"100%"} height={"350px"} />
                                                            </Card >
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={itemRowDisplay} lg={itemRowDisplay} xl={itemRowDisplay}>
                                                        <Box sx={{ padding: '10px' }}>
                                                            <Card sx={{ cursor: 'pointer', border: '1px solid #f3f3f3' }} className='card'>

                                                                <Skeleton variant="rectangular" animation="wave" width={"100%"} height={"350px"} />
                                                            </Card >
                                                        </Box>
                                                    </Grid>

                                                </>
                                                :
                                                products?.length === 0 ?
                                                    <div style={{ width: '100%', textAlign: 'center', margin: '50px 0' }}>
                                                        <Typography variant="h5">Không tìm thấy sản phẩm</Typography>
                                                    </div>
                                                    :
                                                    <Grid container sx={{ width: '100vw' }}>
                                                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                                            <Grid container spacing={0}>
                                                                {products?.slice(0, Math.ceil(products?.length / 2)).map((item, index) => {
                                                                    count++;
                                                                    const isLargeProduct = count === 8;
                                                                    if (count % 8 === 0) {
                                                                        count = 1;
                                                                    }
                                                                    return (
                                                                        <React.Fragment key={index}>
                                                                            {(count === 7 && products?.length >= 7) ?
                                                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                                    <ProductCard
                                                                                        saleRate={item.sale_rate}
                                                                                        minPrice={item.min_price}
                                                                                        maxPrice={item.max_price}
                                                                                        key={item._id}
                                                                                        productImg={item.image[0]}
                                                                                        productName={item.name}
                                                                                        index={item._id}
                                                                                    />
                                                                                </Grid> :
                                                                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                                                                    <ProductCard
                                                                                        saleRate={item.sale_rate}
                                                                                        minPrice={item.min_price}
                                                                                        maxPrice={item.max_price}
                                                                                        key={item._id}
                                                                                        productImg={item.image[0]}
                                                                                        productName={item.name}
                                                                                        index={item._id}
                                                                                    />
                                                                                </Grid>
                                                                            }
                                                                        </React.Fragment>
                                                                    );
                                                                })}
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                                            <Grid container spacing={0}>
                                                                {products?.slice(Math.ceil(products?.length / 2), products?.length).map((item, index) => {
                                                                    countQ++;
                                                                    const isLargeProduct = countQ === 8;
                                                                    if (countQ % 8 === 0) {
                                                                        countQ = 1;
                                                                    }
                                                                    return (
                                                                        <React.Fragment key={index}>
                                                                            {(countQ === 7 && products?.length >= 7) ?
                                                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                                    <ProductCard
                                                                                        saleRate={item.sale_rate}
                                                                                        minPrice={item.min_price}
                                                                                        maxPrice={item.max_price}
                                                                                        key={item._id}
                                                                                        productImg={item.image[0]}
                                                                                        productName={item.name}
                                                                                        index={item._id}
                                                                                    />
                                                                                </Grid> :
                                                                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                                                                    <ProductCard
                                                                                        saleRate={item.sale_rate}
                                                                                        minPrice={item.min_price}
                                                                                        maxPrice={item.max_price}
                                                                                        key={item._id}
                                                                                        productImg={item.image[0]}
                                                                                        productName={item.name}
                                                                                        index={item._id}
                                                                                    />
                                                                                </Grid>
                                                                            }
                                                                        </React.Fragment>
                                                                    );
                                                                })}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                        }
                                        {
                                            data ?
                                                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", width: "100vw" }}>
                                                    <TablePagination
                                                        component="div"
                                                        count={data.total}
                                                        page={page}
                                                        onPageChange={handleChangePage}
                                                        rowsPerPage={rowsPerPage}
                                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                                        labelRowsPerPage={"Số lượng"}
                                                        rowsPerPageOptions={[14]}
                                                        sx={{ display: "flex", flexWrap: "wrap" }}
                                                    />
                                                </Box>
                                                : ""
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box >
                </Box >
            </ThemeProvider >
        </>
    )
}
