import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import PropTypes from 'prop-types';
// ...

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter()
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter()
}];

const RemoteAll = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <BootstrapTable
      remote={ { pagination: true } }
      keyField="id"
      data={ data }
      columns={ columns }
      filter={ filterFactory() }
      pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
      onTableChange={ onTableChange }
    />
    <Code>{ sourceCode }</Code>
  </div>
);

RemoteAll.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalSize: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: products.slice(0, 10),
      totalSize: products.length,
      sizePerPage: 10
    };
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleTableChange = (type, { page, sizePerPage, filters }) => {
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      this.setState(() => ({
        page,
        data: result.slice(currentIndex, currentIndex + sizePerPage),
        totalSize: result.length,
        sizePerPage
      }));
    }, 2000);
  };

  render() {
    const { data, sizePerPage, page } = this.state;
    return (
      <RemoteAll
        data={ data }
        page={ page }
        sizePerPage={ sizePerPage }
        totalSize={ this.state.totalSize }
        onTableChange={ this.handleTableChange }
      />
    );
  }
}