using Microsoft.AspNetCore.Mvc;
using EmployeeManagementInMemory.Models;
using EmployeeManagementInMemory.Data;

namespace EmployeeManagementInMemory.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll() => Ok(EmployeeStore.GetAll());

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var emp = EmployeeStore.GetById(id);
            return emp == null ? NotFound() : Ok(emp);
        }

        [HttpPost]
        public IActionResult Add(Employee emp)
        {
            EmployeeStore.Add(emp);
            return CreatedAtAction(nameof(GetById), new { id = emp.EmployeeId }, emp);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Employee emp)
        {
            if (!EmployeeStore.Update(id, emp)) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!EmployeeStore.Delete(id)) return NotFound();
            return NoContent();
        }
    }
}
