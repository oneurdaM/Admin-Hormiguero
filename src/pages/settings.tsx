import AppLayout from '@/components/layout/app'
import SettingsForm from '@/components/settings/settings-form'

export default function Settings() {
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Settings</h1>
      </div>
      <SettingsForm />
    </>
  )
}

Settings.Layout = AppLayout