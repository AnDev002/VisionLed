
  // "proxy": "https://vision-led-be.onrender.com/",

  <!-- "proxy": "https://vision-led-be.onrender.com", -->
  "proxy": "http://localhost:5000/",



                            <Box className={`searchbox ${(toggleSearch === true) ? 'searchbox-active' : ''} ${(toggleSearch === true) ? 'searchbar-active' : ''}`} sx={{
                                marginTop: '5px',
                                color: opac ? "white" : "white"
                            }}>
                                {(toggleSearch === true) ? <Overlay func={handleToggleSearch} /> : ""}
                                <div className='right-nav search-ic' onClick={handleToggleSearch}><SearchIcon style={{ fontSize: '10px !important', color: "white !important" }} /></div>
                                <div className="gr-search">
                                    <input className={`searchbar`} type="text" value={searchValue} onChange={onSearch} />
                                    <button className="btn-search" onClick={handleSearch}><SearchIcon style={{ fontSize: '10px !important' }} /></button>
                                </div>
                            </Box>


                            "scripts": {
    "start": "react-scripts --openssl-legacy-provider start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },

  /*https://api.visionled.vn/api */