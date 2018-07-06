/* eslint-disable */
import React, { Component } from 'react'

import { Tab, Tabs } from 'react-bootstrap'
import WrapperComponent from '../wrapper/wrapper'
import TableComponent from '../table/table'
import MyLargeModal from '../modal/large-modal'
import { Get } from 'react-axios'
import * as _ from 'lodash'

class DistributorComponent extends Component {

  constructor (props) {
    super(props)
    this.state = {
      lgShow: false,
    }

  }

  render () {
    let lgClose = () => this.setState({lgShow: false})
    let employees = [
      {
        dataField: 'id',
        text: 'ID',
      },
      {
        dataField: 'username',
        text: 'Usuario',
      },
      {
        dataField: 'name',
        text: 'Nombre',
      },
      {
        dataField: 'balance',
        text: 'Balance',
      },
    ]

    let shopkeepers = [
      {
        dataField: 'date_issued',
        text: 'Fecha',
      },
      {
        dataField: 'application_instance_from',
        text: 'Origen',
      },
      // {
      //   dataField: 'user_account.username',
      //   text: 'Usuario'
      // },
      {
        dataField: 'application_instance_to',
        text: 'Destino',
      },
      {
        dataField: 'type_id',
        text: 'Tipo',
      },
      {
        dataField: 'amount_total',
        text: 'Valor',
      },
      {
        dataField: 'code',
        text: 'Código',
      },
    ]
    let kingos = [
      {
        dataField: 'date_issued',
        text: 'Fecha',
      },
      {
        dataField: 'application_instance_from',
        text: 'Origen',
      },
      {
        dataField: 'energy_system_instance_to',
        text: 'Destino',
      },
      {
        dataField: 'type_id',
        text: 'Tipo',
      },
      {
        dataField: 'amount_total',
        text: 'Valor',
      },
      {
        dataField: 'code',
        text: 'Código',
      },
    ]

    let row_buttons = {
      'plus-sign': {
        bgcolor: '#337ab7',
        color: 'white',
        cb: (row) => {
          alert(JSON.stringify(row, undefined, 2))
        },
      },
      'stats': {
        bgcolor: '#5bc0de',
        color: 'white',
        cb: (row) => {
          window.location.href = 'http://www.google.com'
        },
      },
      'ban-circle': {
        bgcolor: '#f0ad4e',
        color: 'white',
        cb: (row, ctx) => {
          this.setState({lgShow: true})
        },
      },
    }

    return (
      <div>
        <MyLargeModal show={this.state.lgShow} onHide={lgClose}/>
        <WrapperComponent title="Distribuidores">
          <Tabs defaultActiveKey={3} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Activo">
              <TableComponent
                icon_title="phone"
                title="Asesores Tecnicos"
                url="http://localhost:3001/v1/distributor/children-balance?user=ventas@cocacola.com.gt&active=1"
                headers={employees}
                row_buttons={row_buttons}
              />
            </Tab>
            <Tab eventKey={2} title="Cerrado">
              <TableComponent
                icon_title="phone"
                title="Asesores Tecnicos"
                url="http://localhost:3001/v1/distributor/children-balance?user=ventas@cocacola.com.gt&active=0"
                headers={employees}
                row_buttons={row_buttons}
              />
            </Tab>
            <Tab eventKey={3} title="Recibos 900739">
              <Get url='http://localhost:3001/v1/pos/info/907960'>
                {(error, response, isLoading, onReload) => {
                  if (isLoading) {
                    return (<div>Loading...</div>)
                  }
                  else if (response !== null) {
                    let person = response.data.data.employee.person
                    if (!_.isEmpty(person)) {
                      return (
                        <div>
                          <div>{person.names ? <div>
                              <strong>Nombre:</strong> {person.names} </div> :
                            <div></div>}</div>
                          <div>{person.surnames ? <div>
                              <strong>Apellido:</strong> {person.surnames} </div> :
                            <div></div>}</div>
                          <div>{person.names ? <div>
                              <strong>DPI:</strong> {person.identity_number} </div> :
                            <div></div>}</div>
                          <div>{person.names ? <div>
                              <strong>Pais:</strong> {person.country_id} </div> :
                            <div></div>}</div>
                          <div>{person.names ? <div>
                              <strong>Telefono:</strong> {person.phone} </div> :
                            <div></div>}</div>
                          <div>{person.names ? <div>
                              <strong>Genero:</strong> {person.gender} </div> :
                            <div></div>}</div>
                        </div>
                      )
                    }
                  }
                  return (<div></div>)
                }}
              </Get>
              <TableComponent
                title="Saldo de Asesor Tecnico"
                url="http://localhost:3001/v1/pos/receipts?&application_to=900739&receipt=true"
                headers={shopkeepers}
              />
              <TableComponent
                title="Recibos de Tenderos"
                url="http://localhost:3001/v1/pos/receipts?&application_from=900739&receipt=true"
                headers={shopkeepers}
              />
              <TableComponent
                title="Recibos de Kingos"
                url="http://localhost:3001/v1/pos/receipts?&application_from=900739&kingos=true&receipt=true"
                headers={kingos}
              />
            </Tab>
          </Tabs>
        </WrapperComponent>
      </div>
    )
  }
}

export default DistributorComponent
