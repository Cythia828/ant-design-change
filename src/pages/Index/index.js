import React, { Component } from 'react';
import { Link } from 'react-router';
import { PageHeader, Table, Divider, Tag, Row, Col, Switch, Modal, Input, Icon, Button, Tooltip, Popover, message } from 'antd';
import { connect } from 'react-redux';
import { agentAction } from './models';
const mapStateToProps = state => {
    return {
      agents: state.agent.agents,
    }
  };
  
  const mapDispatchToProps = dispatch => ({
    fetchAgent(params) {
      dispatch(agentAction.fetchAgent(params))
    },
  });
  
  @connect(mapStateToProps, mapDispatchToProps)
  export default class Agent extends Component {
    state = {
        reqParams: {
            agentVersion: null,
            driverIdList: [],
            isASC: false,
            keyword: null,
            orderField: 'id',
            pageNum: 1,
            pageSize: 20,
            status: null,
            tagIdList: []
          },
    }

    componentDidMount() {
        const { fetchAgent } = this.props;
        const { reqParams } = this.state;
        fetchAgent(reqParams);
        this.fetchTagSearchList();
    }
  // 获取标签
  fetchTagSearchList = async() => {
    // const result = await fetchTagSearchList();
    // if(result&&result.data){
    //   this.setState({
    //     searchTagList:result.data
    //   },()=>{
    //     this.getSearchTagFilter();
    //   })
    // }
  }

    render(){
        const text = '驱动管理';
        const { agents } = this.props;
        const { selectedRowKeys=[], tagParams,driveParams,sourceParams,settingParams, reqParams,currentHostname,editHostVisible } = this.state;
        const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
        };
        const pagination = {
        current: reqParams.pageNum,
        pageSize: reqParams.pageSize,
        total: agents.total,
        size: 'small'
        };
        const columns = [
            {
              title: '主机名称',
              key: 'id',
              width: 150,
              render: (text, record) => {
                return (<span className={"table-td"}>
                  <span>{record.hostName}<Icon type="edit"/></span>
                  {/* <span className={"table-icon"}>{this.getRightIcon(record.targetOs)}</span> */}
                </span>)
              },
            }, {
              title: '主机IP',
              dataIndex: 'hostIp',
              key:"hostIp"
            }, {
              title: 'Agent版本',
              dataIndex: 'agentVersion',
            }, {
              title: '标签',
              dataIndex:'tagList',
              // filters: this.getSearchTagFilter(),
              render: (text, record, index) => (
                <Popover
                  content={(<div>
                    标签：
                    <div style={{display:"inline-block",display:"flex"}}>
                      {text.map((item,index)=>{
                        return (<span style={{width:'100px'}}>{item}&nbsp;&nbsp;</span>)
                      })}
                    </div>
                    
                    <a>分配标签</a>
                  </div>)}
                  title={null}
                  trigger="hover"
                >
                  <span className="td-icon"><Icon type="tags" theme="filled" /></span>
                </Popover>
              ),
            }, {
              title: '采集驱动器',
              dataIndex: 'driverList',
              render: (driverList,record) => (
                <span>
                  {driverList.map(tag => {
                    return <Tag color="blue" key={tag.driverId}>{tag.driverComment}</Tag>;
                  })}
                  <span className="td-icon setting">
                    <Tooltip placement="top" title={text}>
                      <Icon type="setting" />
                    </Tooltip>
                  </span>
                </span>
              ),
            }, {
              title: '采集模型',
              dataIndex: 'modelNum',
              render:(text,record)=>{
                return (
                  <a herf="javascript:;">{text}</a>
                )
              }
            }, {
              title: 'Agent状态',
              dataIndex:'status',
              filters:[
                {
                  text:'开',
                  value:1
                },{
                  text:'关',
                  value:0
                }
              ],
              filterMultiple: false,
              render: (text, record)=> (
                <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked checked={text==1?true:false} />
              )
            }, {
              title: '创建时间',
              dataIndex: 'gmtModified',
              sorter:()=>{},
              // sortDirections: ['descend', 'ascend'],
            }, {
              title: '操作',
              width: 310,
              render: (text, record) => (
                <span>
                  <a href="javascript:;">查看任务</a>
                  <Divider type="vertical" />
                  <a href="javascript:;">资源限制</a>
                  <Divider type="vertical" />
                  <a href="javascript:;">高级配置</a>
                  <Divider type="vertical" />
                  <a href="javascript:;">删除</a>
                </span>
              ),
            }];  
        return(
            <div>
                <Table 
                rowKey={record => record.id}
                rowSelection={rowSelection} 
                columns={columns} 
                dataSource={agents.data||[]}
                pagination={pagination}
                // footer={() => tableFooter}
                // onChange={this.handleChangeFilter}
            /> 
            </div>
        )
    }
  }
