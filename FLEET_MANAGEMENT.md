# Amazon DSP Fleet Management System

A comprehensive fleet management application built for Amazon Delivery Service Partners (DSPs) using React, TypeScript, Vite, and Tailwind CSS 4.1.

## Features

### 5.1 Fleet & Vehicle Management Module

#### 5.1.1 Vehicle Profiles
- **Vehicle Information**: VIN, model, license plate, current mileage
- **Amazon Branding Status**: Track branded, unbranded, or pending branding status
- **Expiry Alerts**: Registration and insurance expiration tracking with color-coded warnings
  - Red: Expired or < 30 days
  - Yellow: 30-60 days
  - Gray: > 60 days
- **Vehicle Status**: Active, Maintenance, Flagged, or Inactive
- **Quick Stats**: Dashboard showing total vehicles, active count, maintenance count, and flagged vehicles

#### 5.1.2 Preventive Maintenance
- **Maintenance Scheduling**: Schedule and track maintenance tasks
- **Maintenance Types**: Oil change, tire rotation, brake inspection, general maintenance
- **Recurring Maintenance**: Set up recurring maintenance intervals (e.g., every 90 days)
- **Cost Tracking**: Track maintenance costs and total fleet maintenance expenses
- **Status Management**: Scheduled, completed, and overdue maintenance tracking
- **Alerts**: Visual indicators for upcoming and overdue maintenance
- **Detailed Records**: Maintenance history with dates, costs, and notes

#### 5.1.3 Digital Inspections
- **Pre-trip & Post-trip Checklists**: Digital inspection forms with categories
  - Exterior checks (tires, lights, body damage)
  - Interior checks (mirrors, cleanliness)
  - Mechanical checks (fluid levels, brakes)
- **Pass/Fail/N/A Status**: Flexible checklist item status
- **Photo Upload Support**: Required photo documentation for damages
- **Automatic Flagging**: Vehicles with failed inspections are automatically flagged
- **Inspector Tracking**: Record who performed each inspection
- **Inspection History**: Complete audit trail with timestamps
- **Pass Rate Analytics**: Track fleet-wide inspection pass rates

#### 5.1.4 Fleet Utilization
- **Vehicle Usage Tracking**: Hours used, miles delivered, packages delivered
- **Route Completion**: Track routes completed per vehicle
- **Idle Time Monitoring**: Identify vehicles with excessive idle time
- **Efficiency Metrics**: Packages per hour calculations
- **Utilization Percentage**: Visual progress bars showing vehicle utilization
- **Top Performers**: Leaderboard showing highest performing vehicles
- **Underutilized Vehicles**: Identify vehicles not being used effectively
- **Productivity Analytics**: Fleet-wide productivity metrics with trend indicators

### Additional Features

#### Alert System
- **Multi-severity Alerts**: Critical, High, Medium, Low
- **Alert Types**: Safety, Maintenance, Registration, Insurance, Inspection
- **Filter & Sort**: Filter by severity, type, and resolved status
- **Mark as Resolved**: Track alert resolution
- **Vehicle Association**: Alerts linked to specific vehicles

## Technology Stack

- **React 19.2**: Latest React with modern hooks
- **TypeScript 5.9**: Full type safety
- **Vite 7.2**: Fast build tool and dev server
- **Tailwind CSS 4.1**: Modern utility-first CSS framework
- **React Router DOM**: Client-side routing
- **Lucide React**: Beautiful icon system
- **date-fns**: Date formatting and manipulation

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173)

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   └── fleet/
│       └── Layout.tsx          # Main layout with navigation
├── pages/
│   └── fleet/
│       ├── FleetOverview.tsx   # Vehicle profiles dashboard
│       ├── Maintenance.tsx     # Maintenance management
│       ├── Inspections.tsx     # Digital inspections
│       ├── Utilization.tsx     # Fleet utilization analytics
│       └── Alerts.tsx          # Alert management
├── types/
│   └── fleet.ts                # TypeScript type definitions
├── data/
│   └── mockData.ts            # Mock data for development
├── App.tsx                     # Main app with routing
├── main.tsx                    # App entry point
└── index.css                   # Global styles with Tailwind
```

## Mock Data

The application includes comprehensive mock data for development and demonstration:
- 4 sample vehicles with varying statuses
- Maintenance records (scheduled, completed, overdue)
- Pre-trip and post-trip inspections
- Fleet utilization data
- Various alert types and severities

## Key Components

### Vehicle Card
Displays comprehensive vehicle information including:
- Model and license plate
- VIN number
- Current mileage
- Branding status
- Registration and insurance expiry dates
- Active alerts

### Maintenance Record
Shows maintenance details with:
- Maintenance type and description
- Scheduled and completed dates
- Cost tracking
- Recurring maintenance intervals
- Status badges

### Inspection Detail
Digital inspection interface featuring:
- Checklist items with pass/fail status
- Photo documentation
- Inspector information
- Timestamp tracking
- Failed items summary

### Utilization Table
Performance tracking with:
- Hours used with progress bars
- Miles and packages delivered
- Routes completed
- Idle time monitoring
- Efficiency calculations (packages/hour)

## Color Coding System

- **Green**: Active, Passed, Completed, Good status
- **Yellow**: Warning, Flagged, Pending, Medium priority
- **Red**: Critical, Failed, Overdue, High priority
- **Blue**: Scheduled, Info, Default status
- **Gray**: Inactive, N/A, Neutral

## Future Enhancements

- Real-time GPS tracking integration
- Driver assignment and management
- Route planning and optimization
- Integration with Amazon DSP APIs
- Mobile app for drivers
- Advanced analytics and reporting
- Automated maintenance scheduling based on mileage
- Integration with maintenance service providers
- Document management (insurance, registration uploads)
- Multi-location support for larger DSPs
