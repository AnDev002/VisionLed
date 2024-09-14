import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProductTable from './ProductTable';
import AddProductButton from './AddProductButton';
import CollectionTable from './CollectionTable';
import UserTable from './UserTable';
import ProjectTable from './ProjectTable';
import OrderTable from './OrderTable';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }

}

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "80vh", marginTop: '50px' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Đơn Hàng" {...a11yProps(0)} />
                <Tab label="Sản Phẩm" {...a11yProps(1)} />
                <Tab label="Người Dùng" {...a11yProps(2)} />
                <Tab label="Dự Án" {...a11yProps(3)} />
                <Tab label="Bộ Sưu Tập" {...a11yProps(4)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Typography component={'div'} variant='h5' sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                    Quản lý đơn hàng
                </Typography>
                <OrderTable />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography component={'div'} variant='h5' sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                    Quản lý sản phẩm
                </Typography>
                <AddProductButton handleCloseForm={handleClick} isOpen={open} type={"ADD_PRODUCT"} />
                <ProductTable />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Container fixed>
                    <Typography component={'div'} variant='h5' sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                        Quản lý người dùng
                    </Typography>
                    <br />
                    <UserTable />
                </Container>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Container fixed>
                    <Typography component={'div'} variant='h5' sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                        Quản lý dự án
                    </Typography>
                    <AddProductButton handleCloseForm={handleClick} isOpen={open} type={"ADD_PROJECT"} />
                    
                    <ProjectTable />
                </Container>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Container fixed>
                    <Typography component={'div'} variant='h5' sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                        Quản lý bộ sưu tập
                    </Typography>
                    <AddProductButton handleCloseForm={handleClick} isOpen={open} type={"ADD_COLLECTION"} />
                    <CollectionTable />
                </Container>
            </TabPanel>
        </Box>
    );
}