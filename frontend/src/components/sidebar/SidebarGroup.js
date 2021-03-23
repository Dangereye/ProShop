import React from "react";

const SidebarGroup = ({ label, value }) => {
  return (
    <div className="sidebar__group">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};

export default SidebarGroup;
