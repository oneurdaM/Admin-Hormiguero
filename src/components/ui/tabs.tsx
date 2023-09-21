import React, { useState } from 'react'

type TabProps = {
  children: JSX.Element
  label: string
  className?: string
}

const Tabs = ({ children }: { children: JSX.Element[] }) => {
  const [activeTab, setActiveTab] = useState<String>(children[0].props.label)

  const handleClick = (e: React.MouseEvent, newActiveTab: string): void => {
    e.preventDefault()
    setActiveTab(newActiveTab)
  }

  return (
    <div className="mx-auto">
      <div className="flex border-b border-[#024154]">
        {children.map((child) => (
          <button
            key={child.props.label}
            className={`${
              activeTab === child.props.label
                ? 'border-b-2 border-[#024154]'
                : ''
            } flex-1 py-2 font-medium text-gray-700`}
            onClick={(e) => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {children.map((child) => {
          if (child.props.label === activeTab) {
            return <div key={child.props.label}>{child.props.children}</div>
          }
          return null
        })}
      </div>
    </div>
  )
}

const Tab: React.FC<TabProps> = ({ label, children, className }) => {
  return (
    <div className={`hidden ${className}`}>
      <label>{label}</label>
      {children}
    </div>
  )
}
export { Tabs, Tab }
