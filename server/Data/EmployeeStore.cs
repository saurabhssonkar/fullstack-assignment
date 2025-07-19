using EmployeeManagementInMemory.Models;

namespace EmployeeManagementInMemory.Data
{
    public static class EmployeeStore
    {
        private static List<Employee> _employees = new();
        private static int _idCounter = 1;

        public static List<Employee> GetAll() => _employees;

        public static Employee GetById(int id) => _employees.FirstOrDefault(e => e.EmployeeId == id);

        public static void Add(Employee employee)
        {
            employee.EmployeeId = _idCounter++;
            _employees.Add(employee);
        }

        public static bool Update(int id, Employee updated)
        {
            var existing = GetById(id);
            if (existing == null) return false;

            existing.Name = updated.Name;
            existing.Department = updated.Department;
            existing.Email = updated.Email;
            existing.PhoneNumber = updated.PhoneNumber;
            return true;
        }

        public static bool Delete(int id)
        {
            var employee = GetById(id);
            if (employee == null) return false;
            _employees.Remove(employee);
            return true;
        }
    }
}
