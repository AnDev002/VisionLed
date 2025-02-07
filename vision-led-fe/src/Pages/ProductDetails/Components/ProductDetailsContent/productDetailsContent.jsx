import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Grid,
  Toolbar,
  IconButton,
  Skeleton,
  LinearProgress,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ProductSwiper from "./../ProductSwiper";
import ProductSlideShow from "../../../Components/productSlideShow";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import * as ProductServices from "../../../../Services/ProductServices"
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../../Redux/Slides/orderSlide';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import QuantityInput from "../../../Components/quantityInput";
import { formatPrice } from "../../../../Ults";
import QuantityCustom from "../../../Components/QuantityCustomm";
import QuantityCustomm from "../../../Components/QuantityCustomm";
import { FcShipped } from "react-icons/fc";
import { FcHeadset } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { FcShop } from "react-icons/fc";
import ProductDetailsSlideShow from "../../../Components/productDetailsSlideShow";



export default function ProductDetailsContent() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [typeId, setTypeId] = useState(null)
  const navigate = useNavigate()
  const GetProductDetails = async (id) => {
    if (id) {
      const res = await ProductServices.GetProductDetails(id);
      return res
    }
    return null;
  }

  const { isLoading: isLoadingDetails, data: dataDetails } = useQuery(
    ['product-details', productId], () => GetProductDetails(productId), {
    onSuccess: (data) => {
      setTypeId(data?.data[0]?.product?.product_type?._id);
    }
  })

  const GetProductsByType = async (typeId) => {
    if (typeId) {
      const res = await ProductServices.GetProductsByType(typeId);
      return res
    }
    return null;
  }
  const { isLoading: isLoadingByType, data: dataByType } = useQuery({ queryKey: ['products-by-type', typeId], queryFn: () => GetProductsByType(typeId) })
  const TextWithNewLines = ({ text }) => {
    if (!text || text === "") {
      return null;
    }

    const textArray = text.split('.');
    const textWithNewLines = textArray.map((sentence, index) => {
      const trimmedSentence = sentence.trim();
      const sentenceWithPeriod = trimmedSentence.length > 0 ? '•' + trimmedSentence : null;

      return (
        <React.Fragment key={index}>
          {index > 0 && <br />}
          <Typography
            component="span"
            variant="h3"
            sx={{
              fontFamily: "Roboto",
              userSelect: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
              width: '100%',
            }}
          >
            {sentenceWithPeriod}
          </Typography>
        </React.Fragment>
      );
    });

    return (
      <>
        {textWithNewLines}
      </>
    );
  };


  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  const label = { inputProps: { "aria-label": "Checkbox" } };

  const handleFacebookClick = () => {
    window.open("https://www.facebook.com", "_blank");
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com", "_blank");
  };

  let powerSet = new Set();
  dataDetails?.data?.map((item) => {
    powerSet.add(item?.power?.powerValue)
  })
  powerSet = [...powerSet]

  let sizeSet = new Set();

  dataDetails?.data?.map((item) => {
    sizeSet.add(item?.size?.sizeName)
  })

  sizeSet = [...sizeSet]

  let colorSet = new Set();

  dataDetails?.data?.map((item) => {
    colorSet.add(item?.color?.colorName)
  })

  colorSet = [...colorSet]

  const referenceProduct = dataDetails?.data[0]?.product

  const [productDetail, setProductDetail] = useState(dataDetails?.data[0]);

  const [alignment, setAlignment] = React.useState(null);

  const handleChangeModel = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const matchProductDetails = (id) => {
    let newProduct = {};
    dataDetails?.data?.forEach(element => {
      if (element._id === id) {
        newProduct = element
      }
    });
    setProductDetail(newProduct);
  }
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }} >
            <Typography sx={{ width: '400px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineClamp: 2 }}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleAddOrderProduct = () => {
    dispatch(addProduct({
      orderItem: {
        quantity: quantity,
        productDetails: alignment,
        itemName: `${(productDetail?.product ? productDetail?.product?.name + " " : "") + (productDetail?.power ? productDetail?.power?.powerValue + " " : "") + (productDetail?.size ? productDetail?.size?.sizeName + " " : "") + (productDetail?.color ? productDetail?.color?.colorName : "")}`,
        main_image: productDetail?.product?.image[0],
        product_type: productDetail?.product?.product_type?.typeName,
        sale_price: productDetail?.sale_price,
        unit_price: productDetail?.unit_price
      },
    }));
  }
  const handleBuyNow = () => {
    handleAddOrderProduct();
    navigate('/payment')
  }
  const handleSeeMore = (typeId) => {
    navigate(`/products/0?type=${typeId}`)
  }

  useEffect(() => {
    if (isLoadingDetails === false) {
      setAlignment(dataDetails?.data[0]?._id);
      setProductDetail(dataDetails?.data[0])
    }
  }, [isLoadingDetails]);


  const onChangeEvent = (e) => {
    const i = e.target.value
    if (!isNaN(i) && i > 0) {
      setQuantity(i);
    }
  }

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '160px', padding: "5px", fontFamily: "Roboto" }}>
        {
          isLoadingDetails === false && isLoadingDetails !== null ?
            <>
              <Grid item xs={12} sm={12} md={6} >
                <Box sx={{marginLeft: "10px"}}>
                  {/* <ProductSwiper image={productDetail?.product?.image} /> */}
                  <ProductDetailsSlideShow productDetails={productDetail?.product?.image}/>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box p={2}>
                  <div className="product-inf-container">
                    <div className="name">
                      <Typography
                        variant="h3"
                        sx={{
                          userSelect: "none",
                          fontSize: "2rem",
                          fontFamily: '"Noto Serif Display", serif !important'
                        }}
                      >
                        {productDetail?.product.name}
                      </Typography>
                    </div>
                    <div className="idProduct">
                      <Typography
                        variant="h3"
                        sx={{
                          userSelect: "none",
                          fontSize: "1.8rem",
                          marginTop: '10px',
                          fontFamily: '"Noto Serif Display", serif'
                        }}
                      >
                        Mã sản phẩm - {productDetail?.idProduct ? productDetail?.idProduct : ""}
                      </Typography>
                    </div>

                    <div className="price" >
                      {
                        (productDetail?.unit_price !== productDetail?.sale_price)
                          ? <span style={{ display: 'flex', gap: '20px', margin: "20px 0" }}>
                            <Typography
                              variant="h4"
                              component="div"
                              sx={{
                                userSelect: "none",
                                fontSize: "1rem",
                                textDecoration: 'line-through',
                                alignItems: 'center',
                                fontFamily: "Roboto", fontWeight: "bold"
                              }}
                            >
                              {formatPrice(productDetail?.unit_price)}
                            </Typography>
                            <Typography
                              variant="h2"
                              component="div"
                              sx={{
                                userSelect: "none",
                                fontSize: "1.5rem",
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                fontFamily: "Roboto", fontWeight: "bold"
                              }}
                            >
                              {" " + formatPrice(productDetail?.sale_price)}
                            </Typography>
                          </span>
                          : <Typography
                            variant="h3"
                            component="div"
                            sx={{
                              userSelect: "none",
                              fontSize: "1rem",
                              textDecoration: 'line-through',
                              alignItems: 'center',
                              fontFamily: "Roboto"
                            }}
                          >
                            {formatPrice(productDetail?.unit_price)}
                          </Typography>
                      }
                    </div>
                    <Box sx={{ background: "#f9f9f9", borderRadius: "8px", padding: "15px 15px", maxWidth: "550px" }}>
                      <div className="model">
                        <span
                          style={{
                            userSelect: "none",
                            fontSize: '1rem',
                            fontFamily: "Roboto"
                          }}
                        >
                          <Typography sx={{fontFamily: '"Noto Serif Display", serif !important'}}>
                            Model
                          </Typography>
                        </span>
                        <ToggleButtonGroup
                          color="primary"
                          value={alignment}
                          exclusive
                          onChange={handleChangeModel}
                          aria-label="Platform"
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                          }}
                        >
                          {
                            dataDetails?.data.map((item, id) => {
                              return <ToggleButton sx={{ background: "none", border: "none", color: 'black', borderRadius: '5px !important', margin: "5px 0" }} onClick={() => matchProductDetails(item._id)} value={item._id} key={id}>{item?.power ? item?.power?.powerValue : ""} {item?.color ? item?.color?.colorName : ""} {(item?.size ? item?.size?.sizeName : "")}</ToggleButton>
                            })
                          }
                        </ToggleButtonGroup>
                      </div>
                      <span
                        sx={{
                          userSelect: "none",
                          fontSize: '1rem',
                          marginTop: "15px",
                          fontFamily: "Roboto"
                        }}
                      >
                        <Typography sx={{fontFamily: '"Noto Serif Display", serif !important'}}>
                          Số Lượng
                        </Typography>
                      </span>
                      <Box sx={{ margin: '20px 0', marginTop: "5px" }}>
                        <QuantityCustomm value={quantity} onChangeEvent={onChangeEvent} increaseQuantity={handleIncrease} decreaseQuantity={handleDecrease} />
                      </Box>
                      <div className="btn-options" style={{ display: "flex" }}>
                        <Button
                          className="Add-to-bag"
                          color="primary"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "1em",
                            color: "black",
                            backgroundColor: "buttonface",
                            "&:hover": {
                              backgroundColor: "rgb(215 215 215)",
                              color: "black",
                              transition: ".3s",
                            },
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <div
                              style={{
                                width: "2em",
                                height: "2em",
                              }}
                              onClick={handleAddOrderProduct}
                            >
                              <AddShoppingCartIcon />
                            </div>
                          </Box>
                        </Button>
                        <Button
                          className="buy-now"
                          color="primary"
                          onClick={handleBuyNow}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "1em",
                            color: "black",
                            backgroundColor: "buttonface",
                            "&:hover": {
                              backgroundColor: "rgb(215 215 215)",
                              color: "black",
                              transition: ".3s",
                            },
                            fontFamily: "Roboto"
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", textTransform: 'none', color: 'black' }}>
                            <Typography variant="h6"  sx={{fontFamily: "Roboto", fontWeight: "bold"}}>Mua Ngay</Typography>
                          </Box>
                        </Button>
                        <button
                          className="add-to-favourite-product"
                          style={{
                            width: "4em",
                            cursor: "pointer",
                            border: 'none'
                          }}
                        >
                          <Checkbox
                            {...label}
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite style={{ color: 'red' }} />}
                          />
                        </button>
                      </div>
                    </Box>
                    <Box sx={{ background: "#f9f9f9", marginTop: "10px", borderRadius: "8px", padding: "15px 15px", maxWidth: "550px" }}>
                      <div style={{ width: "100%" }}>
                        <div style={{}}>
                          <Typography variant="h5" sx={{ marginBottom: "10px",
                          fontFamily: '"Noto Serif Display", serif !important' }}>
                            THÔNG SỐ KĨ THUẬT
                          </Typography>
                        </div>
                        <div style={{}}>
                          <div>

                            {productDetail?.voltage ?
                              <>
                                <Typography
                                  component="span"
                                  variant="h3"
                                  sx={{
                                    userSelect: "none",
                                    fontSize: "1rem",
                                    fontFamily: "Roboto",
                                    fontWeight: 'bold',
                                  }}
                                >
                                  Điện áp - {productDetail?.voltage}
                                </Typography>
                                <br />
                              </>
                              : ""}
                            {productDetail?.power.powerValue ? <>
                              <Typography
                                component="span"
                                variant="h3"
                                sx={{
                                  userSelect: "none",
                                  fontSize: "1rem",
                                  fontFamily: "Roboto",
                                  fontWeight: 'bold',
                                }}
                              >
                                Công suất  - {productDetail?.power.powerValue}
                              </Typography>
                              <br />
                            </> : ""}
                            {
                              productDetail?.luminous_flux ?
                                <>
                                  <Typography
                                    component="span"
                                    variant="h3"
                                    sx={{
                                      userSelect: "none",
                                      fontSize: "1rem",
                                      fontWeight: 'bold',
                                      fontFamily: "Roboto"
                                    }}
                                  >
                                    Quang thông - {productDetail?.luminous_flux}
                                  </Typography>
                                  <br />
                                </> : ""
                            }
                            {
                              productDetail?.standard ?
                                <>
                                  <Typography
                                    component="span"
                                    variant="h3"
                                    sx={{
                                      userSelect: "none",
                                      fontSize: "1rem",
                                      fontWeight: 'bold',
                                      fontFamily: "Roboto"
                                    }}
                                  >
                                    Tiêu chuẩn - {productDetail?.standard}
                                  </Typography>
                                  <br />
                                </> : ""
                            }
                            {
                              productDetail?.secureLv ?
                                <>
                                  <Typography
                                    component="span"
                                    variant="h3"
                                    sx={{
                                      userSelect: "none",
                                      fontSize: "1rem",
                                      fontWeight: 'bold',
                                      fontFamily: "Roboto"
                                    }}
                                  >
                                    Lớp bảo vệ - {productDetail?.secureLv}
                                  </Typography>
                                  <br />
                                </> : ""
                            }
                            {
                              productDetail?.texture ?
                                <>
                                  <Typography
                                    component="span"
                                    variant="h3"
                                    sx={{
                                      userSelect: "none",
                                      fontSize: "1rem",
                                      fontWeight: 'bold',
                                      fontFamily: "Roboto"
                                    }}
                                  >
                                    Vật liệu - {productDetail?.texture}
                                  </Typography>
                                  <br />
                                </> : ""
                            }
                            {
                              productDetail?.lumens_color_temperature ?
                                <>
                                  <Typography
                                    component="span"
                                    variant="h3"
                                    sx={{
                                      userSelect: "none",
                                      fontSize: "1rem",
                                      fontWeight: 'bold',
                                      fontFamily: "Roboto"
                                    }}
                                  >
                                    Nhiệt độ màu - {productDetail?.lumens_color_temperature}
                                  </Typography>
                                  <br />
                                </> : ""
                            }
                            {
                              productDetail?.CRI ?

                                <>
                                  <Typography
                                    component="span"
                                    variant="h3"
                                    sx={{
                                      userSelect: "none",
                                      fontSize: "1rem",
                                      fontWeight: 'bold',
                                      fontFamily: "Roboto"
                                    }}
                                  >
                                    Chỉ số hoàn màu (CRI) - {productDetail?.CRI}
                                  </Typography>
                                  <br />
                                </> : ""
                            }
                            {
                              productDetail?.chip_led ?
                                <>
                                  <Typography
                                    component="span"
                                    variant="h3"
                                    sx={{
                                      userSelect: "none",
                                      fontSize: "1rem",
                                      fontWeight: 'bold',
                                      fontFamily: "Roboto"
                                    }}
                                  >
                                    Chip led - {productDetail?.chip_led}
                                  </Typography>
                                  <br />
                                </> : ""
                            }
                            {
                              productDetail?.dimension ?
                                <>
                                  <Typography
                                    component="span"
                                    variant="h3"
                                    sx={{
                                      userSelect: "none",
                                      fontSize: "1rem",
                                      fontWeight: 'bold',
                                      fontFamily: "Roboto"
                                    }}
                                  >
                                    Kích thước - {productDetail?.dimension}
                                  </Typography>
                                  <br />
                                </> : ""
                            }
                            {
                              productDetail?.hole_dimension ?
                                <>
                                  <Typography
                                    component="span"
                                    variant="h3"
                                    sx={{
                                      userSelect: "none",
                                      fontSize: "1rem",
                                      fontWeight: 'bold',
                                      fontFamily: "Roboto"
                                    }}
                                  >
                                    Kích thước lỗ khoét - {productDetail?.hole_dimension}
                                  </Typography>
                                  <br />
                                </> : ""
                            }
                            {
                              productDetail?.projection_angle ?
                                <>
                                  <Typography
                                    component="span"
                                    variant="h3"
                                    sx={{
                                      userSelect: "none",
                                      fontSize: "1rem",

                                      fontWeight: 'bold',
                                      fontFamily: "Roboto"
                                    }}
                                  >
                                    Góc chiếu - {productDetail?.projection_angle}
                                  </Typography>
                                  <br />
                                </> : ""
                            }
                            {
                              productDetail?.warranty ?
                                <>
                                  <Typography
                                    component="span"
                                    variant="h3"
                                    sx={{
                                      userSelect: "none",
                                      fontSize: "1rem",
                                      fontWeight: 'bold',
                                      fontFamily: "Roboto"
                                    }}
                                  >
                                    Bảo hành - {productDetail?.warranty}
                                  </Typography>
                                  <br />
                                </> : ""
                            }
                          </div>
                        </div>
                      </div>
                    </Box>
                  </div>
                </Box>



              </Grid>
            </>
            : <>
              <Grid item xs={12} sm={12} md={6} >
                <Box sx={{
                  padding: '0 20px', display: 'flex', alignContent: 'center'
                }}>
                  <Skeleton sx={{
                    width: '100%', height: {
                      xs: "260px",
                      sm: "300",
                      md: '350px',
                      lg: "460px"
                    }, aspectRatio: 1
                  }} animation="wave" variant="rectangular" />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box sx={{ padding: '0 20px' }}>
                  <Skeleton animation="wave" sx={{ height: '70px', width: '100%' }} />
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <Skeleton animation="wave" sx={{ height: '45px', width: '100px' }} />
                    <Skeleton animation="wave" sx={{ height: '60px', width: '150px' }} />
                  </div>
                  <Skeleton sx={{ width: '100%', height: "328px" }} animation="wave" variant="rectangular" />

                </Box>
              </Grid> </>
        }
        <Grid item xs={1} lg={2} md={2}></Grid>

      </Grid >
      <Box p={2} sx={{
        padding: {
          md: '50px'
        },
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>

          <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>

            {
              productDetail?.product.descriptions !== "" ?
                <>
                  <Box sx={{ display: 'flex', justifyContent: "center", width: "100%", padding: "5px", borderRadius: "8px", background: "white" }}>
                    <Typography variant="h5">
                      Mô tả sản phẩm
                    </Typography>
                  </Box>
                  <Typography sx={{ width: "100%", marginTop: "5px", padding: "5px", borderRadius: "8px", background: "white" }}>
                    {productDetail?.product.descriptions !== "" ? TextWithNewLines({ text: productDetail?.product.descriptions }) : ""}
                  </Typography>
                </> : ""
            }
          </Box>
        </Box>
       
      </Box>
      <Box
        sx={{ margin: "50px 0", marginBottom: '0', backgroundColor: "#f7f7f7", padding: "50px 0" }}
      >

        {
          isLoadingByType === false && isLoadingDetails === false ?
            <>
              <Box
                sx={{
                  padding: {
                    xs: "0 5px",
                    sm: "0 15px",
                    md: "0 50px",
                    lg: "0 150px",
                    xl: "0 250px",
                  },
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                  cursor: "pointer",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    marginLeft: "5px",
                    fontSize: "1rem"
                  }}
                >
                  Có thể bạn quan tâm
                </Typography>
                <div className="btn-see-more" onClick={() => handleSeeMore(typeId)}>Xem Thêm</div>
              </Box>
              <ProductSlideShow products={dataByType?.data} />
            </>
            :
            <>
              <LinearProgress color="inherit" style={{ color: 'gray', height: '7px' }} />
            </>
        }
      </Box>
    </>
  );
}
