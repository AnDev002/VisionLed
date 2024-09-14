import * as React from 'react';
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { changeQuantity } from '../../Redux/Slides/orderSlide';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';

      

export default function QuantityInput({ quantity, handleInputChange, handleIncrease, handleDecrease }) {
   

    return <>
        <div className="product-options-input" style={{width: '300px'}}>
            <div className="quantity">
                <div
                    className="input-quantity"
                    style={{
                        position: "relative",
                        marginBottom: "2em",
                    }}
                >
                    <div className="number-input-title"></div>
                  
                    <label htmlFor="Quantity">
                        <div
                            style={{
                                position: "relative",
                                width: "6em",
                            }}
                        >
                            <input
                                type="number"
                                id="Quantity"
                                value={quantity}
                                onChange={handleInputChange}
                                min={1}
                                max={100}
                                readOnly
                                style={{
                                    height: "3em",
                                    width: "100%",
                                    paddingLeft: "1em",
                                    paddingRight: "2em",
                                    border: "1px solid #5757",
                                    borderRadius: "3px",
                                    cursor: "default",
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    top: "10%",
                                    right: "1.6em",
                                    width: "1.5em",
                                    height: "2em",
                                    backgroundColor: "#ffff",
                                    cursor: "default",
                                }}
                            ></div>
                            <Box
                                className="quantity-input-spinner-arrows-container"
                                sx={{
                                    position: "absolute",
                                    top: "10%",
                                    right: "0.5em",
                                    opacity: "1",
                                }}
                            >
                                <span
                                    onClick={handleIncrease}
                                    style={{
                                        backgroundImage:
                                            "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+RGVza3RvcCAxOTIwIC8gMTA4MDwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTIiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9IkRlc2t0b3AtMTkyMC0vLTEwODAiIHN0cm9rZT0iIzEyMTIxMiI+ICAgICAgICAgICAgPGcgaWQ9InF0eSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMy4wMDAwMDAsIDUuMDAwMDAwKSI+ICAgICAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUmVjdGFuZ2xlLTMtQ29weSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS4wMDAwMDAsIDUuMDAwMDAwKSByb3RhdGUoLTIyNS4wMDAwMDApIHRyYW5zbGF0ZSgtNS4wMDAwMDAsIC01LjAwMDAwMCkgIiBwb2ludHM9IjggOCAyIDggMiAyIj48L3BvbHlsaW5lPiAgICAgICAgICAgIDwvZz4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==)",
                                        width: "1em",
                                        height: "1em",
                                        display: "block",
                                        cursor: "pointer",
                                        userSelect: "none",
                                    }}
                                ></span>
                                <span
                                    onClick={handleDecrease}
                                    style={{
                                        backgroundImage:
                                            "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+RGVza3RvcCAxOTIwIC8gMTA4MDwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTIiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9IkRlc2t0b3AtMTkyMC0vLTEwODAiIHN0cm9rZT0iIzEyMTIxMiI+ICAgICAgICAgICAgPGcgaWQ9InF0eSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOC4wMDAwMDAsIDYuMDAwMDAwKSByb3RhdGUoLTE4MC4wMDAwMDApIHRyYW5zbGF0ZSgtOC4wMDAwMDAsIC02LjAwMDAwMCkgdHJhbnNsYXRlKDMuMDAwMDAwLCAxLjAwMDAwMCkiPiAgICAgICAgICAgICAgICA8cG9seWxpbmUgaWQ9IlJlY3RhbmdsZS0zLUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuMDAwMDAwLCA1LjAwMDAwMCkgcm90YXRlKC0yMjUuMDAwMDAwKSB0cmFuc2xhdGUoLTUuMDAwMDAwLCAtNS4wMDAwMDApICIgcG9pbnRzPSI4IDggMiA4IDIgMiI+PC9wb2x5bGluZT4gICAgICAgICAgICA8L2c+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=)",
                                        width: "1em",
                                        height: "1em",
                                        display: "block",
                                        cursor: "pointer",
                                        userSelect: "none",
                                    }}
                                ></span>
                            </Box>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    </>;
}

const blue = {
    100: '#daecff',
    200: '#b6daff',
    300: '#66b2ff',
    400: '#3399ff',
    500: '#007fff',
    600: '#0072e5',
    700: '#0059B2',
    800: '#004c99',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const StyledInputRoot = styled('div')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`,
);

const StyledInput = styled('input')(
    ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
        };
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledButton = styled('button')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 8px;
  border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? blue[700] : blue[500]};
    border-color: ${theme.palette.mode === 'dark' ? blue[500] : blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`,
);
