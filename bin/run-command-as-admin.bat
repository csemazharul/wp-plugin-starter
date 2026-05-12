@echo off

:: this file is a batch file that runs a command as an administrator

:: BatchGotAdmin
:-------------------------------------
REM  --> Check for permissions
    IF "%PROCESSOR_ARCHITECTURE%" EQU "amd64" (
>nul 2>&1 "%SYSTEMROOT%WPStarterKitWPStarterKit\WPStarterKitWPStarterKitSysWOW64WPStarterKitWPStarterKit\WPStarterKitWPStarterKitcacls.exe" "%SYSTEMROOT%WPStarterKitWPStarterKit\WPStarterKitWPStarterKitSysWOW64WPStarterKitWPStarterKit\WPStarterKitWPStarterKitconfigWPStarterKitWPStarterKit\WPStarterKitWPStarterKitsystem"
) ELSE (
>nul 2>&1 "%SYSTEMROOT%WPStarterKitWPStarterKit\WPStarterKitWPStarterKitsystem32WPStarterKitWPStarterKit\WPStarterKitWPStarterKitcacls.exe" "%SYSTEMROOT%WPStarterKitWPStarterKit\WPStarterKitWPStarterKitsystem32WPStarterKitWPStarterKit\WPStarterKitWPStarterKitconfigWPStarterKitWPStarterKit\WPStarterKitWPStarterKitsystem"
)

REM --> If error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACWPStarterKitWPStarterKitPrompt
) else ( goto gotAdmin )

:UACWPStarterKitWPStarterKitPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%WPStarterKitWPStarterKit\WPStarterKitWPStarterKitgetadmin.vbs"
    set params = %*
    echo UAC.ShellExecute "cmd.exe", "/c %~s0 %*", "", "runas", 1 >> "%temp%WPStarterKitWPStarterKit\WPStarterKitWPStarterKitgetadmin.vbs"

    "%temp%WPStarterKitWPStarterKit\WPStarterKitWPStarterKitgetadmin.vbs"
    del "%temp%WPStarterKitWPStarterKit\WPStarterKitWPStarterKitgetadmin.vbs"
    exit /B

:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0"
:--------------------------------------

echo Running command with concatenated params: %*
:: Call all parameters %* as a command
%*

:: To keep the command prompt window open, uncomment the next line
:: pause
