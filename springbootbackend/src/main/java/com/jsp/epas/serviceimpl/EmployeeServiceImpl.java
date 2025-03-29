package com.jsp.epas.serviceimpl;

import com.jsp.epas.entity.Employee;
import com.jsp.epas.enums.Rating;
import com.jsp.epas.repository.AppraisalRepository;
import com.jsp.epas.repository.EmployeeRepository;
import com.jsp.epas.requestdto.EmployeeRequest;
import com.jsp.epas.responsedto.EmployeeResponse;
import com.jsp.epas.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final AppraisalRepository appraisalRepository;

    private Employee mapToEmployee(EmployeeRequest employeeRequest, Employee employee) {
        employee.setEmployeeName(employeeRequest.getEmployeeName());
        employee.setRating(Rating.valueOf(String.valueOf(employeeRequest.getRating())));
        return employee;
    }

    private EmployeeResponse mapToEmployeeResponse(Employee employee) {
        return EmployeeResponse.builder()
                .employeeId(employee.getEmployeeId())
                .employeeName(employee.getEmployeeName())
                .rating(Rating.valueOf(String.valueOf(employee.getRating())))
                .build();
    }

    @Override
    public EmployeeResponse addEmployee(EmployeeRequest employeeRequest) {
        Employee employeeDetails = this.mapToEmployee(employeeRequest, new Employee());
        employeeRepository.save(employeeDetails);
        return this.mapToEmployeeResponse(employeeDetails);

    }

    @Override
    public EmployeeResponse findEmployeeById(int employeeId) {
        return null;
    }

    @Override
    public List<EmployeeResponse> findAllEmployee() {
        return List.of();
    }

    @Override
    public EmployeeResponse updateEmployeeById(int employeeId, EmployeeRequest employeeRequest) {
        return null;
    }

    @Override
    public void deleteEmployeeById(int employeeId) {

    }

    @Override
    public EmployeeResponse updateEmployeeRating(int id, String newRating) {
        return null;
    }


}
