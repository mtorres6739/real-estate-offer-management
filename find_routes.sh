#!/bin/bash
echo "Searching for all dashboard-related files..."
find /Users/mathewtorres/projects/real-estate-offer-management/src -type f -exec grep -l "dashboard" {} \;
