import Sidebar from './../../components/Sidebar/Sidebar';
import style from './EmployeesList.module.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useHistory } from 'react'
import { useNavigate, NavLink } from "react-router-dom"
import { getEmployees, deleteEmployee } from './../../store/employee/employeeSlice';

const EmployeesList = () => {
  const { employees, isLoading } = useSelector(state => state.employees)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getEmployees())
  }, [dispatch])

  const handleDelete = (_id) => {
    dispatch(deleteEmployee(_id))
  }


  const employeesList = employees && employees.map((employee) => (<tr key={employee._id}>
    <td scope="row" className="text-center">{employee.fullName}</td>
    <td className="text-center">{employee.email}</td>
    <td className="text-center">{employee.phone}</td>
    <td className="text-center">{employee.position}</td>
    <td className="text-center">{employee.dateOfEmployment}</td>
    {/* <td><span className='fa-solid fa-trash' role="button" onClick={() => handleDelete(employee._id)}></span></td> */}
    <td className="text-center"><span className='fa-solid fa-pen-to-square' role="button" onClick={() => { navigate(`/employees/${employee._id}`, { state: { employeeData: employee } }) }} ></span></td>
  </tr>))

  return (<>
    <Sidebar />
    <div className={style.employeesList}>
      {isLoading ? 'loading...' : <div className='container'><NavLink to="/employees/add" className="btn btn-primary my-2">Add employee</NavLink><table className="table table-hover table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Employee Name</th>
            <th className="text-center">Customer Email</th>
            <th className="text-center">Customer Phone</th>
            <th className="text-center">Customer Position</th>
            <th className="text-center">Date Of Employment</th>
          </tr>
        </thead>
        <tbody>{employeesList}</tbody>
      </table>
      </div>
      }
    </div>

  </>);
}

export default EmployeesList;