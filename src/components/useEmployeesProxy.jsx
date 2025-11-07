import { useState, useEffect } from "react";

export default function useEmployeesProxy(initialData, notify) {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem("employeesData");
    return saved ? JSON.parse(saved) : initialData;
  });



  // Save to localStorage whenever employees change
  useEffect(() => {
    localStorage.setItem("employeesData", JSON.stringify(employees));
  }, [employees]);


   // FOR GENERAL VALIDATION 
  const [ valid , setValid ] = useState(true)
  // Proxy handler
  const handler = {
    get(target, prop) {
      
      return Reflect.get(target, prop);
      
    },
    set(target, prop, value) {
      setValid(true);
      const result = Reflect.set(target, prop, value);

      // FULL NAME VALIDATION 
      if (prop === "fullName"){
        if (typeof value !== "string" || !/^[A-Za-z\s]+$/.test(value) || value.length > 50 || value === ""){
            notify("enter only letters & less than 50 letter & not empty")
            setValid(false);
            return false;
        }
      }

      // SALARY VALIDATION 
      if(prop === "salary"){
        if (typeof value !== "number" || value <= 0 || value >= 10000 ){
          notify("salary must be under 10000 & not equal zero")
          return false;
        }
      }

      notify(`Updated ${prop} → ${value}`);
      setEmployees([...employees]);
      return result;
    },
    deleteProperty(target, prop) {
      const result = Reflect.deleteProperty(target, prop);
      notify(`Deleted ${prop}`);
      setEmployees([...employees]);
      return result;
    },
  };

  // Wrap each employee object in Proxy
  const proxyList = employees.map((emp) => new Proxy(emp, handler));

  // Utility methods
  const addEmployee = (emp) => {
    setEmployees((prev) => {
      const updated = [...prev, emp];
      localStorage.setItem("employeesData", JSON.stringify(updated));
      notify("Employee added");
      return updated;
    });
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      localStorage.setItem("employeesData", JSON.stringify(updated));
      notify(` Employee ${id} deleted`);
      return updated;
    });
  };

  return { employees: proxyList, setEmployees, addEmployee, deleteEmployee , valid};
}
