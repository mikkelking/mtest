import React from "react";
import styled, { css } from "styled-components";

export const ToastBox = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  background: #f5f5f5;
  position: relative;
`;

export const Toast = styled.li`
  position: relative;
  font-size: 24px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 12px 0 rgba(0, 0, 0, 0.1);
  // box-shadow: 0 -1px 0 #ededed;
  // height: calc(97px - 32px);
  overflow: hidden;
  // margin-bottom: 16px;
  background: #fff;
  &:last-child {
    border-bottom: none;
  }
`;

export const ToastLabel = styled.label`
  white-space: pre;
  word-break: break-word;
  padding: 15px 60px 15px 15px;
  margin-left: 45px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  ${props =>
    props.completed &&
    css`
      color: #d9d9d9;
      text-decoration: line-through;
    `}
`;

export const Destroy = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  outline: none;
  vertical-align: baseline;
  appearance: none;
  font-smoothing: antialiased;

  ${props =>
    props.hideX &&
    css`
      display: none;
    `}
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;

  &:hover {
    color: #af5b5e;
  }
  ${Toast}:hover & {
    display: block;
  }
  &:after {
    content: "×";
  }
`;
