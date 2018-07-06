import React, {Component} from 'react';
import {Button, Glyphicon, Row} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios';
import PropTypes from 'prop-types';
import './table.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import * as _ from 'lodash';

const RemoteAll = ({data, page, sizePerPage, onTableChange, totalSize, columns}) => (
 <div>
   <BootstrapTable
    remote={{pagination: true}}
    keyField="id"
    data={data}
    columns={columns}
    filter={filterFactory ()}
    pagination={paginationFactory ({page, sizePerPage, totalSize})}
    onTableChange={onTableChange}
    responsive
    striped
    bordered
    hover
   />
 </div>
);

RemoteAll.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalSize: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired,
};

class TableComponent extends Component {

  constructor(props) {
    super (props);
    this.state = {
      page: 1,
      data: [],
      totalSize: 0,
      sizePerPage: 10,
    };
    this.handleTableChange = this.handleTableChange.bind (this);
    this.handleClick = this.handleClick.bind (this);
  }

  handleClick = (row, cb) => {
    cb (row, this);
  };

  handleTableChange = (type, {page, sizePerPage, filters}) => {
    console.log (filters);
    let self = this;
    axios.get (
     `${this.props.url}&offset=${page}&limit=${sizePerPage}${this.filterToParams (
      filters)}`).then ((response) => {
      self.setState (() => ({
        page: response.data.pagination.page,
        data: response.data.data,
        totalSize: response.data.pagination.rowCount,
        sizePerPage: response.data.pagination.pageSize,
      }));
    }, (error) => {
      self.setState (() => ({
        page: 1,
        data: [],
        totalSize: 0,
        sizePerPage: 10,
      }));
      console.log (error);
    });
  };

  filterToParams(filters) {
    if (_.isEmpty (filters)) return '';
    let str = '&filters=';
    for (let filter in filters) {
      str += `${filter}:${filters[filter].filterVal},`;
    }
    return str.substr (0, str.length - 1);
  }

  addHeaders(headers, row_buttons) {
    let columns = [];
    if (headers) {
      columns = headers;
      for (let i in columns) {
        columns[i].filter = textFilter (
         {placeholder: `Ingrese ${columns[i].text}`});
      }
    }

    if (row_buttons) {
      let buttons = Object.keys (row_buttons);
      columns.push ({
        dataField: '',
        text: '',
        style: () => {
          return {width: `${(buttons.length * 42)}px`};
        },
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return (
           <div> {
             buttons.map ((k) => {
               let buttonStyle = {
                 backgroundColor: row_buttons[k].bgcolor,
                 borderColor: row_buttons[k].bgcolor,
                 color: row_buttons[k].color,
               };
               return <Button className="icon-row"
                              style={buttonStyle}
                              key={k}
                              onClick={this.handleClick.bind (this, row,
                               row_buttons[k].cb)}>
                 <Glyphicon glyph={k}/></Button>;
             })
           } </div>
          );
        },
      });
    }

    return columns;
  };

  componentDidMount() {
    let self = this;
    axios.get (this.props.url).then ((response) => {
      self.setState (() => ({
        page: response.data.pagination.page,
        data: response.data.data,
        totalSize: response.data.pagination.rowCount,
        sizePerPage: response.data.pagination.pageSize,
      }));
    }, (error) => {
      console.log (error);
    });
  }

  render() {
    console.log('Me renderize');
    let headers = this.addHeaders (this.props.headers.slice (0),
     this.props.row_buttons);
    let titleRow = this.props.title || this.props.icon_title ?
     <Row>
       <h3>
         <Glyphicon glyph={this.props.icon_title ? this.props.icon_title : ''}/>
         {' ' + this.props.title}
       </h3>
     </Row> : '';
    return (
     <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12"
          key='panel-template'>
       {titleRow}
       <Row key='row-1'>
         <RemoteAll
          data={this.state.data}
          page={this.state.page}
          sizePerPage={this.state.sizePerPage}
          totalSize={this.state.totalSize}
          onTableChange={this.handleTableChange}
          columns={headers}
         />
       </Row>
     </div>
    );
  }
}

export default TableComponent;