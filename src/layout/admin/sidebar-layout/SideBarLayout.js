import { Layout } from 'antd';
import Sidebar from '../../../part/admin/sidebar/Sidebar';
import { useState } from 'react';
import styled from 'styled-components';
const Trigger = styled.div`
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #001529;
    span{
        padding:16px;
        i{
            color: white;
        }
    }
   

`
function SidebarLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout>
            <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
                <Trigger><span onClick={() => setCollapsed(state => !state)}><i className="fi fi-rr-menu-burger"></i></span></Trigger>
                <Sidebar />
            </Layout.Sider>
            <Layout>
                <Layout.Header />
                <Layout.Content>
                    {children}
                </Layout.Content>
            </Layout>
        </Layout>);
}

export default SidebarLayout;