import styled, { css } from "styled-components";

export const Input = styled.input`
    border: none;
    padding:8px 16px;
    width:100%;
    font-size: 0.9rem;
    color:var(--text-dark-200);
    font-weight: 500;
    border-bottom: 2px solid;
    border-color:  ${props => props.$danger ? "var(--danger-color)" : "var(--primary-color-400)"};
    -webkit-appearance: none;
    appearance: none;
    &:focus{
        color:var(--text-dark);
        outline: none;
        border-color:${props => props.$danger ? "var(--danger-color)" : "var(--primary-color-800)"};
    }
`
export const Select = styled.select`
    border: none;
    padding:8px 16px;
    width:100%;
    font-size: 0.9rem;
    color:var(--text-dark-200);
    font-weight: 500;
    border-bottom: 2px solid;
    border-color:  ${props => props.$danger ? "var(--danger-color)" : "var(--primary-color-400)"};
    -webkit-appearance: none;
    appearance: none;
    option{
        padding:8px 16px;
    }
    &:focus{
        color:var(--text-dark);
        outline: none;
        border-color:${props => props.$danger ? "var(--danger-color)" : "var(--primary-color-800)"};
    }
`
export const Error = styled.span`
    color:var(--danger-color);
    font-size: 0.8rem;
    font-weight: 500;
    min-height: 0.8rem;
    display: block;
`
export const Button = styled.button`
    border:1px solid var(--sub-color-800);
    padding:5px 16px 6px 16px;
    color:var(--text-color);
    background-color: transparent;
    font-weight: 500;
    font-size: 0.9rem;
    border-radius: var(--base-radius);
    &:hover{
        color:white;
        background-color:var(--sub-color-800) ;
    }
`